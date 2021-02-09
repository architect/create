let proxyquire = require('proxyquire')
let destination
let written
let fsStub = {
  writeFile: (dest, data, cb) => {
    destination = dest
    written = data
    cb()
  }
}
let writeCode = proxyquire('../../../../src/lambda/write-code', {
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
    runtime: 'nodejs12',
    body: 'this is bat country'
  }, () => {})
  t.equal(destination, 'src/lambda/index.js', 'Correct file location to be written to')
  t.equal(written, 'this is bat country', 'Correct argument-provided content written')
})

test('Should write template body if no body provided via argument', t => {
  t.plan(2)
  writeCode({
    handlerFile: 'src/http/get-catchall/index.js',
    runtime: 'nodejs12',
    type: 'http'
  }, () => {})
  t.equal(destination, 'src/http/get-catchall/index.js', 'Correct file location to be written to')
  t.match(written, /async function http/, 'Correct argument-provided content written')
})
