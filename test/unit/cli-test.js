let proxyquire = require('proxyquire')
let test = require('tape')
let bootstrapFake = { install: true }
let nameFake = { folder: '/some/path/to/project' }
let invFake = {
  inv: {
    _project: {
      preferences: {},
      defaultFunctionConfig: { runtime: 'nodejs12' }
    }
  }
}
let staticCallCount = 0
let cli = proxyquire('../../cli', {
  './src/bootstrap/_banner': () => {},
  './src/bootstrap': () => bootstrapFake,
  './src/bootstrap/_get-name': () => nameFake,
  '@architect/inventory': () => Promise.resolve(invFake),
  './src/simple-static': () => { staticCallCount++ }
})

test('should invoke static module if static option provided', async t => {
  t.plan(1)
  await cli([ '--static' ])
  t.equals(staticCallCount, 1, 'static module called when static option provided')
})
