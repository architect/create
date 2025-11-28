let { test } = require('node:test')
let assert = require('node:assert/strict')
let { join, sep } = require('path')
let os = require('os')
let cwd = process.cwd()
let sut = join(cwd, 'src', '_get-name')
let getName = require(sut)
let defaultName = 'create'
let s = str => str[0].replace(/\//g, sep)

test('Set up env', () => {
  assert.ok(getName, 'Loaded getName')
})

test('No name/folder specified', () => {
  let result = getName({ cwd })
  assert.equal(result.name, defaultName, 'Got default name of current directory')
  assert.equal(result.folder, cwd, 'Got default folder of current directory')
})

test('Name specified', () => {
  let name = 'hi'
  let result = getName({ cwd, name })
  assert.equal(result.name, name, 'Name passed through')
  assert.equal(result.folder, cwd, 'Got default folder of current directory')
})

test('Folder specified', () => {
  let folder
  let result

  folder = cwd
  result = getName({ cwd, folder })
  assert.equal(result.name, defaultName, 'Got default name of current directory')
  assert.equal(result.folder, folder, `Got specified folder: ${folder}`)

  folder = s`foo`
  result = getName({ cwd, folder })
  assert.equal(result.name, 'foo', 'Got default name of current directory')
  assert.equal(result.folder, join(cwd, 'foo'), `Got specified folder: ${folder}`)

  folder = s`./foo`
  result = getName({ cwd, folder })
  assert.equal(result.name, 'foo', 'Got default name of current directory')
  assert.equal(result.folder, join(cwd, 'foo'), `Got specified folder: ${folder}`)

  folder = s`../foo`
  result = getName({ cwd, folder })
  assert.equal(result.name, 'foo', 'Got default name of current directory')
  assert.equal(result.folder, join(cwd, '..', 'foo'), `Got specified folder: ${folder}`)

  folder = s`../../foo`
  result = getName({ cwd, folder })
  assert.equal(result.name, 'foo', 'Got default name of current directory')
  assert.equal(result.folder, join(cwd, '..', '..', 'foo'), `Got specified folder: ${folder}`)

  folder = s`/foo`
  result = getName({ cwd, folder })
  let root = os.platform == 'win32' ? process.cwd().split(sep)[0] : sep
  assert.equal(result.name, 'foo', 'Got default name of current directory')
  assert.equal(result.folder, join(root, 'foo'), `Got specified folder: ${folder}`)

  folder = s`./`
  result = getName({ cwd, folder })
  assert.equal(result.name, defaultName, 'Got default name of current directory')
  assert.equal(result.folder, cwd, `Got specified folder: ${folder}`)

  let path
  let pop = p => p.split(sep).reverse().shift()
  folder = s`../`
  path = join(cwd, '..')
  result = getName({ cwd, folder })
  assert.equal(result.name, pop(path), `Got name from directory: ${result.name}`)
  assert.equal(result.folder, path, `Got specified folder: ${folder}`)

  folder = s`../../`
  path = join(cwd, '..', '..')
  result = getName({ cwd, folder })
  assert.equal(result.name, pop(path), `Got name from directory: ${result.name}`)
  assert.equal(result.folder, path, `Got specified folder: ${folder}`)
})
