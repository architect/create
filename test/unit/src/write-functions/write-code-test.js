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

test('Set up env', t => {
  t.plan(1)
  t.ok(writeCode, 'Loaded writeCode')
})

test('Should write body if provided via argument', t => {
  t.plan(2)
  writeCode({
    handlerFile: 'src/lambda/index.js',
    config: {
      runtime: 'nodejs14.x',
    },
    body: 'lolidk'
  }, () => {})
  t.equal(destination, 'src/lambda/index.js', 'Correct file location to be written to')
  t.equal(written, 'lolidk', 'Correct argument-provided content written')
})

test('Should write template body if no body provided via argument', t => {
  t.plan(2)
  writeCode({
    handlerFile: 'src/http/get-catchall/index.js',
    config: {
      runtime: 'nodejs14.x',
    },
    pragma: 'http'
  }, () => {})
  t.equal(destination, 'src/http/get-catchall/index.js', 'Correct file location to be written to')
  t.match(written, /async function http/, 'Correct argument-provided content written')
})
