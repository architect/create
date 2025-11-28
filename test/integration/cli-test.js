let { describe, it, before, beforeEach } = require('node:test')
let assert = require('node:assert/strict')
let create = require('../../src/index')
let { join, resolve } = require('path')
let { readFileSync, existsSync, rmSync, mkdirSync } = require('fs')
let { updater } = require('@architect/utils')
let tmp = resolve(__dirname, '..', 'tmp')

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
    await create({
      folder: tmp,
      install: false,
      runtime: 'node.js',
      update: updater('Create'),
    })
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'index.mjs')), 'src/http/get-index/index.mjs created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime node/), '"runtime node" present somewhere in manifest')
  })

  it('should build the basic templated deno runtime project', async () => {
    await create({
      folder: tmp,
      install: false,
      runtime: 'deno',
      update: updater('Create'),
    })
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'mod.ts')), 'src/http/get-index/mod.ts created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime deno/), '"runtime deno" present somewhere in manifest')
  })

  it('should build the basic templated python runtime project', async () => {
    await create({
      folder: tmp,
      install: false,
      runtime: 'python',
      update: updater('Create'),
    })
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'lambda.py')), 'src/http/get-index/lambda.py created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime python/), '"runtime python" present somewhere in manifest')
  })

  it('should build the basic templated ruby runtime project', async () => {
    await create({
      folder: tmp,
      install: false,
      runtime: 'ruby',
      update: updater('Create'),
    })
    assert.ok(existsSync(join(tmp, 'src', 'http', 'get-index', 'lambda.rb')), 'src/http/get-index/lambda.rb created')
    assert.ok(readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime ruby/), '"runtime ruby" present somewhere in manifest')
  })
})
