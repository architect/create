let proxyquire = require('proxyquire')
let args = []
let codeStub = (params, cb) => {
  args.push(params)
  cb()
}
let inv
let invStub = () => inv
let create = proxyquire('../../../src', {
  './lambda': codeStub,
  '@architect/inventory': invStub,
  './bootstrap': () => {},
})
let test = require('tape')
let update = {
  done: () => {}
}

test('Should invoke code-writing module for @plugin functions', t => {
  t.plan(4)
  inv = {
    inv: {
      _project: {
        preferences: {},
        defaultFunctionConfig: { runtime: 'nodejs14.x' }
      },
      plugins: [
        {
          src: '/some/path/to/project/src/new/lambda',
          name: 'new-lambda',
          body: 'molded by it'
        }
      ]
    }
  }
  create({
    standalone: true,
    update
  }, (err) => {
    t.notOk(err, 'Did not error')
    let codeArg = args[0]
    t.equals(codeArg.src, '/some/path/to/project/src/new/lambda', 'Path to new plugin function passed to code writing module')
    t.equals(codeArg.body, 'molded by it', 'Body of new plugin function passed to code writing module')
    t.equals(codeArg.type, 'plugins', 'New plugin function has a type of plugin passed to code writing module')
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
  create({
    standalone: true,
    update
  }, (err) => {
    t.notOk(err, 'Did not error')
  })
})
