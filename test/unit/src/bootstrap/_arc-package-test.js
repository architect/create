let test = require('tape')
let { join } = require('path')
let proxyquire = require('proxyquire')

let exists = false
let destination
let written
let arcAsDep = { dependencies: { '@architect/architect': 'latest' } }
let arcAsDevDep = { devDependencies: { '@architect/architect': 'latest' } }
let pkg = arcAsDep

let fsStub = {
  existsSync: () => exists,
  readFileSync: () => JSON.stringify(pkg),
  writeFileSync: (dest, data) => {
    destination = dest
    written = data
  },
  '@noCallThru': false
}
let arcPackage = proxyquire('../../../../src/bootstrap/_arc-package', {
  fs: fsStub
})
let foo = 'foo'
let name = foo
let folder = __dirname
let argv = process.argv
let reset = () => {
  destination = ''
  written = ''
  process.argv = argv
}

test('Set up env', t => {
  t.plan(1)
  t.ok(arcPackage, 'Loaded getName')
})

test('Package writer bails when Architect is called from a global install', t => {
  t.plan(2)
  process.argv = [ '/usr/local/bin/node', '/usr/local/bin/arc', 'create' ]
  let result = arcPackage({})
  t.notOk(result, 'Invocation from global install should opt out of Arc installation')
  reset()

  process.argv = [ '/usr/local/bin/node', '/usr/local/bin/arc', 'init' ]
  result = arcPackage({})
  t.notOk(result, 'Invocation from global install should opt out of Arc installation')
  reset()
})

test('Package writer writes a package file when none exists', t => {
  t.plan(3)
  process.argv = []
  let result = arcPackage({ name, folder })
  t.ok(result, 'Missing package file found should opt into Arc installation')
  t.equal(destination, join(__dirname, 'package.json'), 'Wrote package.json to specified folder')
  t.equal(JSON.parse(written)['name'], foo, 'package.json uses specified app name')
  reset()
})

test(`Package writer determines whether to install Arc based on an existing package.json`, t => {
  t.plan(3)
  process.argv = []
  exists = true
  let result = arcPackage({ name, folder })
  t.notOk(result, 'Found package file with Arc as dep should opt out of Arc installation')
  reset()

  pkg = arcAsDevDep
  result = arcPackage({ name, folder })
  t.notOk(result, 'Found package file with Arc as dev dep should opt out of Arc installation')
  reset()

  pkg = {}
  result = arcPackage({ name, folder })
  t.ok(result, 'Found package file with no Arc installed, so opt into Arc installation')
  reset()
})
