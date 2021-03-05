let proxyquire = require('proxyquire')
let args = []
let codeStub = (params, cb) => {
  args.push(params)
  cb()
}
let create = proxyquire('../../../src', {
  './lambda': codeStub
})
let test = require('tape')

test('Should invoke code-writing module for @plugin functions', t => {
  t.plan(4)
  let update = {
    done: () => {}
  }
  let inventory = {
    inv: {
      _project: {
        preferences: {},
        defaultFunctionConfig: { runtime: 'nodejs12' }
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
    inventory,
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
  let update = {
    done: () => {}
  }
  let inventory = {
    inv: {
      _project: {
        preferences: {},
        defaultFunctionConfig: { runtime: 'nodejs12' }
      },
    }
  }
  create({
    standalone: true,
    inventory,
    update
  }, (err) => {
    t.notOk(err, 'Did not error')
  })
})

