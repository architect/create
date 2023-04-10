let { join } = require('path')
let proxyquire = require('proxyquire')
let destination
let written
let fsStub = {
  writeFileSync: (dest, data) => {
    destination = dest
    written = data
  }
}
let sut = join(process.cwd(), 'src', 'write-functions', 'write-code')
let writeCode = proxyquire(sut, {
  fs: fsStub
})
let test = require('tape')

let inventory = {
  inv: {
    _project: {},
    plugins: null,
  }
}

test('Set up env', t => {
  t.plan(1)
  t.ok(writeCode, 'Loaded writeCode')
})

test('Should write template body if no body provided via argument', t => {
  t.plan(2)
  writeCode({
    handlerFile: 'src/http/get-catchall/index.js',
    config: {
      runtime: 'nodejs14.x',
    },
    handlerModuleSystem: 'cjs',
    pragma: 'http'
  }, inventory)
  t.equal(destination, 'src/http/get-catchall/index.js', 'Correct file location to be written to')
  t.match(written, /async function http/, 'Correct argument-provided content written')
})
