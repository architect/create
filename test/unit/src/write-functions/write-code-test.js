let { describe, it, beforeEach, afterEach } = require('node:test')
let assert = require('node:assert/strict')
let Module = require('module')

let destination
let written

// Store original require
let originalRequire = Module.prototype.require

let inventory = {
  inv: {
    _project: {},
    plugins: null,
  },
}

describe('write-code', () => {
  let writeCode

  beforeEach(() => {
    // Reset state
    destination = ''
    written = ''

    // Mock fs module
    Module.prototype.require = function (id) {
      if (id === 'fs') {
        return {
          existsSync: originalRequire.apply(this, [ 'fs' ]).existsSync,
          mkdirSync: originalRequire.apply(this, [ 'fs' ]).mkdirSync,
          writeFileSync: (dest, data) => {
            destination = dest
            written = data
          },
        }
      }
      return originalRequire.apply(this, arguments)
    }

    // Clear module cache and require the module
    delete require.cache[require.resolve('../../../../src/write-functions/write-code')]
    writeCode = require('../../../../src/write-functions/write-code')
  })

  afterEach(() => {
    // Restore original require
    Module.prototype.require = originalRequire
  })

  it('should load the module', () => {
    assert.ok(writeCode, 'Loaded writeCode')
  })

  it('should write template body if no body provided via argument', async () => {
    await writeCode({
      handlerFile: 'src/http/get-catchall/index.js',
      config: {
        runtime: 'nodejs14.x',
      },
      handlerModuleSystem: 'cjs',
      pragma: 'http',
    }, inventory)
    assert.equal(destination, 'src/http/get-catchall/index.js', 'Correct file location to be written to')
    assert.match(written, /async function http/, 'Correct argument-provided content written')
  })
})
