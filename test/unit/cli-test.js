let proxyquire = require('proxyquire')
let test = require('tape')
let createParams
let create = p => createParams = p
let reset = () => {
  process.argv = argv
  createParams = undefined
}
let cli = proxyquire('../../cli', {
  '.': create,
})
let argv = process.argv
let args = s => process.argv = [ 'fake-env', 'fake-file', ...s.split(' ').filter(Boolean) ]

test('CLI flags and params', async t => {
  t.plan(20)
  args('')
  await cli()
  Object.entries(createParams).forEach(([ k, v ]) => {
    if (k === 'update' || k === 'standalone') return
    if (v !== undefined) t.fail(`${k} should be undefined`)
  })
  t.pass('By default the CLI passes no controlling params')
  reset()

  // Name
  let name = 'hi'
  await cli({ name })
  t.equal(createParams.name, name, 'Got name from module params')
  reset()

  args(`--name ${name}`)
  await cli()
  t.equal(createParams.name, name, 'Got name from CLI --name')
  reset()

  args(`-n ${name}`)
  await cli()
  t.equal(createParams.name, name, 'Got name from CLI -n')
  reset()

  // Install / no-install
  await cli({ install: true })
  t.not(createParams.install, 'Got install: true from module params')
  reset()

  await cli({ install: false })
  t.notOk(createParams.install, 'Got install: false from module params')
  reset()

  args(`--noinstall`)
  await cli()
  t.notOk(createParams.install, 'Got install: false from CLI --noinstall')
  reset()

  args(`--no-install`)
  await cli()
  t.notOk(createParams.install, 'Got install: false from CLI --no-install')
  reset()

  // Runtime
  let runtime = 'python'
  await cli({ runtime })
  t.equal(createParams.runtime, runtime, 'Got runtime from module params')
  reset()

  args(`--runtime ${runtime}`)
  await cli()
  t.equal(createParams.runtime, runtime, 'Got runtime from CLI --runtime')
  reset()

  args(`-r ${runtime}`)
  await cli()
  t.equal(createParams.runtime, runtime, 'Got runtime from CLI -r')
  reset()

  // Standalone
  await cli({ standalone: true })
  t.ok(createParams.standalone, 'Got standalone from module params')
  reset()

  // Static
  await cli({ static: true })
  t.ok(createParams.static, 'Got static from module params')
  reset()

  args('--static')
  await cli()
  t.ok(createParams.static, 'Got static from CLI')
  reset()

  // Verbose
  await cli({ verbose: true })
  t.ok(createParams.verbose, 'Got verbose from module params')
  reset()

  args('--verbose')
  await cli()
  t.ok(createParams.verbose, 'Got verbose from CLI')
  reset()

  args('-v')
  await cli()
  t.ok(createParams.verbose, 'Got verbose from CLI')
  reset()

  // Folder
  let folder = './foo'
  await cli({ folder })
  t.equal(createParams.folder, folder, 'Got folder from module params')
  reset()

  args(folder)
  await cli()
  t.equal(createParams.folder, folder, 'Got folder from CLI')
  reset()

  args(`create ${folder}`) // Ignore create
  await cli()
  t.equal(createParams.folder, folder, `Got folder from CLI, ignored 'create'`)
  reset()
})
