let test = require('tape')
let cli = require('../../src/cli')
let { join } = require('path')
let fs = require('fs-extra')
let { readFileSync, existsSync } = require('fs')
let tmp = join(__dirname, '..', 'tmp')
let origCwd = process.cwd()
let argv = process.argv
let args = s => process.argv = [ 'fake-env', 'fake-file', ...s.split(' ') ]

test('integration test setup', async t => {
  t.plan(1)
  await fs.emptyDir(tmp)
  process.chdir(tmp)
  t.pass('integration test environment setup complete')
})

test('should build the basic templated node runtime project', async t => {
  t.plan(2)
  fs.emptyDirSync(tmp)
  args('--no-install --runtime node.js')
  await cli()
  t.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'index.js')), 'src/http/get-index/index.js created')
  t.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime node/), '"runtime node" present somewhere in manifest')
})

test('should build the basic templated deno runtime project', async t => {
  t.plan(2)
  fs.emptyDirSync(tmp)
  args('--no-install --runtime deno')
  await cli()
  t.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'mod.ts')), 'src/http/get-index/mod.ts created')
  t.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime deno/), '"runtime deno" present somewhere in manifest')
})

test('should build the basic templated python runtime project', async t => {
  t.plan(2)
  fs.emptyDirSync(tmp)
  args('--no-install --runtime python')
  await cli()
  t.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'index.py')), 'src/http/get-index/index.py created')
  t.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime python/), '"runtime python" present somewhere in manifest')
})

test('should build the basic templated ruby runtime project', async t => {
  t.plan(2)
  fs.emptyDirSync(tmp)
  args('--no-install --runtime ruby')
  await cli()
  t.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'index.rb')), 'src/http/get-index/index.rb created')
  t.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime ruby/), '"runtime ruby" present somewhere in manifest')
})

test('integration test teardown', t => {
  t.plan(1)
  process.argv = argv
  process.chdir(origCwd)
  t.pass('integration test environment setup removed')
})
