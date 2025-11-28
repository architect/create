let { describe, it, beforeEach, afterEach } = require('node:test')
let assert = require('node:assert/strict')
let { join } = require('path')
let Module = require('module')

let exists = false
let destination
let written
let arcAsDep = { dependencies: { '@architect/architect': 'latest' } }
let arcAsDevDep = { devDependencies: { '@architect/architect': 'latest' } }
let pkg = arcAsDep

let foo = 'foo'
let name = foo
let folder = __dirname
let argv = process.argv

// Store original require
let originalRequire = Module.prototype.require

describe('_arc-package', () => {
  let arcPackage

  beforeEach(() => {
    // Reset state
    destination = ''
    written = ''
    exists = false
    pkg = arcAsDep
    process.argv = argv

    // Mock fs module
    Module.prototype.require = function (id) {
      if (id === 'fs') {
        return {
          existsSync: () => exists,
          readFileSync: () => Buffer.from(JSON.stringify(pkg)),
          writeFileSync: (dest, data) => {
            destination = dest
            written = data
          },
        }
      }
      return originalRequire.apply(this, arguments)
    }

    // Clear module cache and require the module
    delete require.cache[require.resolve('../../../../src/bootstrap/_arc-package')]
    arcPackage = require('../../../../src/bootstrap/_arc-package')
  })

  afterEach(() => {
    // Restore original require
    Module.prototype.require = originalRequire

    // Reset state
    exists = false
    pkg = arcAsDep
    process.argv = argv
  })

  it('should load the module', () => {
    assert.ok(arcPackage, 'Loaded arcPackage')
  })

  it('should bail when Architect is called from a global install', () => {
    process.argv = [ '/usr/local/bin/node', '/usr/local/bin/arc', 'create' ]
    let result = arcPackage({})
    assert.ok(!result, 'Invocation from global install should opt out of Arc installation')

    process.argv = [ '/usr/local/bin/node', '/usr/local/bin/arc', 'init' ]
    result = arcPackage({})
    assert.ok(!result, 'Invocation from global install should opt out of Arc installation')
  })

  it('should write a package file when none exists', () => {
    process.argv = []
    let result = arcPackage({ name, folder })
    assert.ok(result, 'Missing package file found should opt into Arc installation')
    assert.equal(destination, join(__dirname, 'package.json'), 'Wrote package.json to specified folder')
    assert.equal(JSON.parse(written)['name'], foo, 'package.json uses specified app name')
  })

  it('should determine whether to install Arc based on an existing package.json', () => {
    process.argv = []
    exists = true
    let result = arcPackage({ name, folder })
    assert.ok(!result, 'Found package file with Arc as dep should opt out of Arc installation')

    pkg = arcAsDevDep
    result = arcPackage({ name, folder })
    assert.ok(!result, 'Found package file with Arc as dev dep should opt out of Arc installation')

    pkg = {}
    result = arcPackage({ name, folder })
    assert.ok(result, 'Found package file with no Arc installed, so opt into Arc installation')
  })
})
