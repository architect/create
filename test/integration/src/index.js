// Test brough over from @architect/utils
/*
let test = require('tape')
let proxyquire = require('proxyquire')
let sinon = require('sinon')

test('arc file with static pragma queues up /public generator', t => {
  t.plan(1)
  let readFake = sinon.fake.returns({
    arc: {
      static: {}
    }
  })
  let publicFake = sinon.fake.yields()
  let init = proxyquire('../init', {
    '../read-arc': readFake,
    './public-code': publicFake
  })
  init([], function(err) {
    if (err) t.fail('unexpected error callback')
    else {
      t.ok(publicFake.calledOnce, 'public code generator queued up')
    }
  })
})

test('arc file with http pragma queues up lambda generator', t => {
  t.plan(1)
  let readFake = sinon.fake.returns({
    arc: {
      aws: [['runtime', 'ruby2.5']],
      http: [['GET', '/wrecked']]
    }
  })
  let codeFake = sinon.fake.yields()
  let init = proxyquire('../init', {
    '../read-arc': readFake,
    './lambda-code': codeFake
  })
  init([], function(err) {
    if (err) t.fail('unexpected error callback')
    else {
      t.ok(codeFake.calledWithMatch({type:'http', runtime:'ruby2.5', method:'GET', path: '/wrecked'}), 'lambda code generation invoked properly for http')
    }
  })
})

test('arc file with events, queues and scheduled pragmas queue up lambda generator', t => {
  t.plan(3)
  let readFake = sinon.fake.returns({
    arc: {
      aws: [['runtime', 'python3.7']],
      events: ['olympics'],
      queues: ['surflineup'],
      scheduled: [['naptime', 'daily']],
    }
  })
  let codeFake = sinon.fake.yields()
  let init = proxyquire('../init', {
    '../read-arc': readFake,
    './lambda-code': codeFake
  })
  init([], function(err) {
    if (err) t.fail('unexpected error callback')
    else {
      t.ok(codeFake.calledWithMatch({type:'events', runtime:'python3.7', name:'olympics'}), 'lambda code generation invoked properly for events')
      t.ok(codeFake.calledWithMatch({type:'queues', runtime:'python3.7', name:'surflineup'}), 'lambda code generation invoked properly for queues')
      t.ok(codeFake.calledWithMatch({type:'scheduled', runtime:'python3.7', name:'naptime'}), 'lambda code generation invoked properly for scheduled')
    }
  })
})

test('arc file with tables pragma with a stream defined property queues up lambda generator', t => {
  t.plan(2)
  let readFake = sinon.fake.returns({
    arc: {
      tables: [{users: {stream: true}}, {pets: {}}]
    }
  })
  let codeFake = sinon.fake.yields()
  let init = proxyquire('../init', {
    '../read-arc': readFake,
    './lambda-code': codeFake
  })
  init([], function(err) {
    if (err) t.fail('unexpected error callback')
    else {
      t.ok(codeFake.calledWithMatch({type:'tables', runtime:'nodejs10.x', name:'users'}), 'lambda code generation invoked properly for table with stream properly')
      t.notOk(codeFake.calledWithMatch({type:'tables', runtime:'nodejs10.x', name:'pets'}), 'lambda code generation NOT invoked for table without stream properly')
    }
  })
})
*/
