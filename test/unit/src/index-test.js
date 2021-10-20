let test = require('tape')
let proxyquire = require('proxyquire')
let configs
let writeConfigsStub = () => configs
let functionArgs = []
let writeFunctionsStub = params => {
  functionArgs.push(params)
}
let writeStaticStub = () => {}
let update = { done: () => {} }
let inv
let invStub = () => inv
let create = proxyquire('../../../src', {
  '@architect/inventory': invStub,
  './bootstrap': () => {},
  './write-configs': writeConfigsStub,
  './write-functions': writeFunctionsStub,
  './write-static': writeStaticStub,
})

test('Should invoke creation @plugin functions', t => {
  t.plan(3)
  let src = '/some/path/to/project/src/new/lambda'
  let name = 'new-lambda'
  let body = 'molded by it'
  configs = [ { pragma: 'plugins', src } ]
  inv = {
    inv: {
      _project: {
        preferences: {},
        defaultFunctionConfig: { runtime: 'nodejs14.x' }
      },
      plugins: [ { src, name, body } ]
    }
  }
  create({ update }, (err) => {
    t.notOk(err, 'Did not error')
    let functionArg = functionArgs[0]
    t.equals(functionArg.dirs[0].src, src, 'Got path to new plugin function')
    t.equals(functionArg.dirs[0].pragma, 'plugins', 'Specified plugin pragma')
  })
})

test('Should not error if @plugins does not exist in inventory', t => {
  t.plan(1)
  inv = {
    inv: {
      _project: {
        preferences: {},
        defaultFunctionConfig: { runtime: 'nodejs14.x' }
      },
    }
  }
  create({ update }, (err) => {
    t.notOk(err, 'Did not error')
  })
})
