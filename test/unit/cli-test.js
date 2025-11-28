const { test } = require('node:test')
const assert = require('node:assert')
const Module = require('module')

let createParams
const argv = process.argv
const args = s => process.argv = [ 'fake-env', 'fake-file', ...s.split(' ').filter(Boolean) ]
let reset = () => {
  process.argv = argv
  createParams = undefined
}

// Mock the create module by intercepting require
const originalRequire = Module.prototype.require
let cli

test('CLI flags and params', async () => {
  // Setup: Mock the create module
  Module.prototype.require = function (id) {
    if (id === '.' || id === './index.js') {
      return (p) => { createParams = p }
    }
    return originalRequire.apply(this, arguments)
  }

  // Clear require cache and reload cli
  delete require.cache[require.resolve('../../src/cli')]
  cli = require('../../src/cli')

  // Restore require after loading
  Module.prototype.require = originalRequire

  args('')
  await cli()
  Object.entries(createParams).forEach(([ k, v ]) => {
    if (k === 'update' || k === 'standalone') return
    if (v !== undefined) assert.fail(`${k} should be undefined`)
  })
  reset()

  // Name
  let name = 'hi'
  args(`--name ${name}`)
  await cli()
  assert.equal(createParams.name, name, 'Got name from CLI --name')
  reset()

  args(`-n ${name}`)
  await cli()
  assert.equal(createParams.name, name, 'Got name from CLI -n')
  reset()

  // Install / no-install
  await cli({ install: true })
  assert.ok(createParams.install, 'Got install: true from module params')
  reset()

  await cli({ install: false })
  assert.ok(!createParams.install, 'Got install: false from module params')
  reset()

  args(`--noinstall`)
  await cli()
  assert.ok(!createParams.install, 'Got install: false from CLI --noinstall')
  reset()

  args(`--no-install`)
  await cli()
  assert.ok(!createParams.install, 'Got install: false from CLI --no-install')
  reset()

  // Runtime
  let runtime = 'python'
  args(`--runtime ${runtime}`)
  await cli()
  assert.equal(createParams.runtime, runtime, 'Got runtime from CLI --runtime')
  reset()

  args(`-r ${runtime}`)
  await cli()
  assert.equal(createParams.runtime, runtime, 'Got runtime from CLI -r')
  reset()

  // Standalone
  await cli({ standalone: true })
  assert.ok(createParams.standalone, 'Got standalone from module params')
  reset()

  // Plugin
  args('--plugin')
  await cli()
  assert.ok(createParams.plugin, 'Got plugin from CLI')
  reset()

  // Verbose
  args('--verbose')
  await cli()
  assert.ok(createParams.verbose, 'Got verbose from CLI')
  reset()

  args('-v')
  await cli()
  assert.ok(createParams.verbose, 'Got verbose from CLI')
  reset()

  // Folder
  let folder = './foo'
  args(folder)
  await cli()
  assert.equal(createParams.folder, folder, 'Got folder from CLI')
  reset()

  args(`create ${folder}`) // Ignore create
  await cli()
  assert.equal(createParams.folder, folder, `Got folder from CLI, ignored 'create'`)
  reset()
})
