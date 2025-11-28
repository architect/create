let { describe, it, before, after, beforeEach } = require('node:test')
let assert = require('node:assert/strict')
let cli = require('../../src/cli')
let { join, resolve } = require('path')
let { readFileSync, existsSync, rmSync, mkdirSync } = require('fs')
let tmp = resolve(__dirname, '..', 'tmp')
let argv = process.argv
let args = s => process.argv = [ 'fake-env', 'fake-file', ...s.split(' ') ]

// Helper to empty a directory (replaces fs-extra's emptyDirSync)
function emptyDirSync (dir) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true })
  }
  mkdirSync(dir, { recursive: true })
}

describe('CLI Integration Tests', () => {
  before(() => {
    // Ensure tmp directory exists
    emptyDirSync(tmp)
  })

  beforeEach(() => {
    // Clean tmp directory before each test
    emptyDirSync(tmp)
  })

  it('should build the basic templated node runtime project', async () => {
    args(`--no-install --runtime node.js ${tmp}`)
    await cli()
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'index.mjs')), 'src/http/get-index/index.mjs created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime node/), '"runtime node" present somewhere in manifest')
  })

  it('should build the basic templated deno runtime project', async () => {
    args(`--no-install --runtime deno ${tmp}`)
    await cli()
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'mod.ts')), 'src/http/get-index/mod.ts created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime deno/), '"runtime deno" present somewhere in manifest')
  })

  it('should build the basic templated python runtime project', async () => {
    args(`--no-install --runtime python ${tmp}`)
    await cli()
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'lambda.py')), 'src/http/get-index/lambda.py created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime python/), '"runtime python" present somewhere in manifest')
  })

  it('should build the basic templated ruby runtime project', async () => {
    args(`--no-install --runtime ruby ${tmp}`)
    await cli()
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'lambda.rb')), 'src/http/get-index/lambda.rb created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime ruby/), '"runtime ruby" present somewhere in manifest')
  })

  after(() => {
    process.argv = argv
  })
})
