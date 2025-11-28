#!/usr/bin/env node
// Simple test runner that avoids Node.js test runner serialization issues
let create = require('../../src/index')
let { join, resolve } = require('path')
let { readFileSync, existsSync, rmSync, mkdirSync } = require('fs')
let { updater } = require('@architect/utils')

let tmp = resolve(__dirname, '..', 'tmp')
let passed = 0
let failed = 0

function emptyDirSync (dir) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true })
  }
  mkdirSync(dir, { recursive: true })
}

async function test (name, fn) {
  try {
    emptyDirSync(tmp)
    await fn()
    console.log(`✓ ${name}`)
    passed++
  }
  catch (err) {
    console.error(`✗ ${name}`)
    console.error(err)
    failed++
  }
}

async function main () {
  console.log('Running CLI Integration Tests...\n')

  await test('should build the basic templated node runtime project', async () => {
    let update = updater('Create')
    await create({ folder: tmp, install: false, runtime: 'node.js', update })
    if (!existsSync(join(tmp, 'src', 'http', 'get-index', 'index.mjs'))) {
      throw new Error('index.mjs not created')
    }
    if (!readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime node/)) {
      throw new Error('runtime node not in manifest')
    }
  })

  await test('should build the basic templated deno runtime project', async () => {
    let update = updater('Create')
    await create({ folder: tmp, install: false, runtime: 'deno', update })
    if (!existsSync(join(tmp, 'src', 'http', 'get-index', 'mod.ts'))) {
      throw new Error('mod.ts not created')
    }
    if (!readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime deno/)) {
      throw new Error('runtime deno not in manifest')
    }
  })

  await test('should build the basic templated python runtime project', async () => {
    let update = updater('Create')
    await create({ folder: tmp, install: false, runtime: 'python', update })
    if (!existsSync(join(tmp, 'src', 'http', 'get-index', 'lambda.py'))) {
      throw new Error('lambda.py not created')
    }
    if (!readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime python/)) {
      throw new Error('runtime python not in manifest')
    }
  })

  await test('should build the basic templated ruby runtime project', async () => {
    let update = updater('Create')
    await create({ folder: tmp, install: false, runtime: 'ruby', update })
    if (!existsSync(join(tmp, 'src', 'http', 'get-index', 'lambda.rb'))) {
      throw new Error('lambda.rb not created')
    }
    if (!readFileSync(join(tmp, 'app.arc'), 'utf-8').match(/runtime ruby/)) {
      throw new Error('runtime ruby not in manifest')
    }
  })

  console.log(`\n${passed} passed, ${failed} failed`)
  process.exit(failed > 0 ? 1 : 0)
}

main()
