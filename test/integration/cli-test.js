let { describe, it, before, after } = require('node:test')
let assert = require('node:assert/strict')
let cli = require('../../src/cli')
let { join } = require('path')
let fs = require('fs-extra')
let { readFileSync, existsSync } = require('fs')
let tmp = join(__dirname, '..', 'tmp')
let origCwd = process.cwd()
let argv = process.argv
let args = s => process.argv = [ 'fake-env', 'fake-file', ...s.split(' ') ]

describe('CLI Integration Tests', () => {
  before(async () => {
    fs.emptyDirSync(tmp)
    process.chdir(tmp)
  })

  it('should build the basic templated node runtime project', async () => {
    fs.emptyDirSync(tmp)
    args('--no-install --runtime node.js')
    await cli()
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'index.mjs')), 'src/http/get-index/index.mjs created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime node/), '"runtime node" present somewhere in manifest')
  })

  it('should build the basic templated deno runtime project', async () => {
    fs.emptyDirSync(tmp)
    args('--no-install --runtime deno')
    await cli()
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'mod.ts')), 'src/http/get-index/mod.ts created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime deno/), '"runtime deno" present somewhere in manifest')
  })

  it('should build the basic templated python runtime project', async () => {
    fs.emptyDirSync(tmp)
    args('--no-install --runtime python')
    await cli()
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'lambda.py')), 'src/http/get-index/lambda.py created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime python/), '"runtime python" present somewhere in manifest')
  })

  it('should build the basic templated ruby runtime project', async () => {
    fs.emptyDirSync(tmp)
    args('--no-install --runtime ruby')
    await cli()
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'lambda.rb')), 'src/http/get-index/lambda.rb created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime ruby/), '"runtime ruby" present somewhere in manifest')
  })

  after(() => {
    process.argv = argv
    process.chdir(origCwd)
  })
})
