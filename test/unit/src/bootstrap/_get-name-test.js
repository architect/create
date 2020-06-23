let test = require('tape')
let { join } = require('path')
let getName = require('../../../../src/bootstrap/_get-name')

test('Set up env', t => {
  t.plan(1)
  t.ok(getName, 'Loaded getName')
})

let cmd = (...arrays) => [].concat(...arrays)
// Locally installed as dep
let npxArcCreate = [ 'npx', 'arc', 'create' ]
// Globally installed
let arcCreate = [ 'arc', 'create' ]
// Not installed
let npmInit = [ 'npm', 'init', '@architect' ]

test('Filter entry paths', t => {
  t.plan(6)
  // Locally installed as dep
  let local = getName({ options: cmd(npxArcCreate) })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(local)

  // Globally installed
  let global = getName({ options: cmd(arcCreate) })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(global)

  // Not installed
  let init = getName({ options: cmd(npmInit, '@architect') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(init)
})


test('Filter known create flags', t => {
  t.plan(36)
  /**
   * Locally installed as dep
   */
  // Verbose
  let local = getName({ options: cmd(npxArcCreate, 'verbose') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '--verbose') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '-v') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(local)

  // Runtime
  local = getName({ options: cmd(npxArcCreate, 'runtime', 'foo') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '--runtime', 'foo') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '-r', 'foo') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, process.cwd(), 'Unspecified folder runs in current folder')

  /**
   * Globally installed
   */
  // Verbose
  let global = getName({ options: cmd(arcCreate, 'verbose') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '--verbose') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '-v') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(global)

  // Runtime
  global = getName({ options: cmd(arcCreate, 'runtime', 'foo') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '--runtime', 'foo') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '-r', 'foo') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(global)

  /**
   * Not installed
   */
  // Verbose
  let init = getName({ options: cmd(npmInit, 'verbose') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(init)

  init = getName({ options: cmd(npmInit, '--verbose') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(init)

  init = getName({ options: cmd(npmInit, '-v') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(init)

  // Runtime
  init = getName({ options: cmd(npmInit, 'runtime', 'foo') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(init)

  init = getName({ options: cmd(npmInit, '--runtime', 'foo') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(init)

  init = getName({ options: cmd(npmInit, '-r', 'foo') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(init)
})

test('Specify name and/or folder', t => {
  t.plan(51)
  /**
   * Locally installed as dep
   */
  let local = getName({ options: cmd(npxArcCreate, 'foo') })
  t.equal(local.name, 'foo', 'Project name matches')
  t.equal(local.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, './foo') })
  t.equal(local.name, 'foo', 'Project name matches')
  t.equal(local.folder, join(process.cwd(), 'foo'), 'Leading ./ specifies working dir is current dir')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '../foo') })
  t.equal(local.name, 'foo', 'Project name matches')
  t.equal(local.folder, join(process.cwd(), '..', 'foo'), 'Leading ../ specifies working dir is one dir down')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '../../foo') })
  t.equal(local.name, 'foo', 'Project name matches')
  t.equal(local.folder, join(process.cwd(), '..', '..', 'foo'), 'Leading ../../ specifies working dir is two dirs down')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '/foo') })
  t.equal(local.name, 'foo', 'Project name matches')
  t.equal(local.folder, join('/', 'foo'), '(Unix only) leading / specifies working dir is root')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, './') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, process.cwd(), './ specifies working dir is current dir')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '../') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, join(process.cwd(), '..'), '../ specifies working dir is one dir down')
  console.log(local)

  local = getName({ options: cmd(npxArcCreate, '../../') })
  t.notOk(local.name, 'Project name not passed')
  t.equal(local.folder, join(process.cwd(), '..', '..'), '../ specifies working dir is one dir down')
  console.log(local)

  t.throws(() => {
    getName({ options: cmd(npxArcCreate, '/') })
  }, 'Passing root throws error')

  /**
   * Globally installed
   */
  let global = getName({ options: cmd(arcCreate, 'foo') })
  t.equal(global.name, 'foo', 'Project name matches')
  t.equal(global.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(global)

  global = getName({ options: cmd(arcCreate, './foo') })
  t.equal(global.name, 'foo', 'Project name matches')
  t.equal(global.folder, join(process.cwd(), 'foo'), 'Leading ./ specifies working dir is current dir')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '../foo') })
  t.equal(global.name, 'foo', 'Project name matches')
  t.equal(global.folder, join(process.cwd(), '..', 'foo'), 'Leading ../ specifies working dir is one dir down')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '../../foo') })
  t.equal(global.name, 'foo', 'Project name matches')
  t.equal(global.folder, join(process.cwd(), '..', '..', 'foo'), 'Leading ../../ specifies working dir is two dirs down')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '/foo') })
  t.equal(global.name, 'foo', 'Project name matches')
  t.equal(global.folder, join('/', 'foo'), '(Unix only) leading / specifies working dir is root')
  console.log(global)

  global = getName({ options: cmd(arcCreate, './') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, process.cwd(), './ specifies working dir is current dir')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '../') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, join(process.cwd(), '..'), '../ specifies working dir is one dir down')
  console.log(global)

  global = getName({ options: cmd(arcCreate, '../../') })
  t.notOk(global.name, 'Project name not passed')
  t.equal(global.folder, join(process.cwd(), '..', '..'), '../ specifies working dir is one dir down')
  console.log(global)


  t.throws(() => {
    getName({ options: cmd(arcCreate, '/') })
  }, 'Passing root throws error')

  /**
   * Not installed
   */
  let init = getName({ options: cmd(npmInit, 'foo') })
  t.equal(init.name, 'foo', 'Project name matches')
  t.equal(init.folder, process.cwd(), 'Unspecified folder runs in current folder')
  console.log(init)

  init = getName({ options: cmd(npmInit, './foo') })
  t.equal(init.name, 'foo', 'Project name matches')
  t.equal(init.folder, join(process.cwd(), 'foo'), 'Leading ./ specifies working dir is current dir')
  console.log(init)

  init = getName({ options: cmd(npmInit, '../foo') })
  t.equal(init.name, 'foo', 'Project name matches')
  t.equal(init.folder, join(process.cwd(), '..', 'foo'), 'Leading ../ specifies working dir is one dir down')
  console.log(init)

  init = getName({ options: cmd(npmInit, '../../foo') })
  t.equal(init.name, 'foo', 'Project name matches')
  t.equal(init.folder, join(process.cwd(), '..', '..', 'foo'), 'Leading ../../ specifies working dir is two dirs down')
  console.log(init)

  init = getName({ options: cmd(npmInit, '/foo') })
  t.equal(init.name, 'foo', 'Project name matches')
  t.equal(init.folder, join('/', 'foo'), '(Unix only) leading / specifies working dir is root')
  console.log(init)

  init = getName({ options: cmd(npmInit, './') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, process.cwd(), './ specifies working dir is current dir')
  console.log(init)

  init = getName({ options: cmd(npmInit, '../') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, join(process.cwd(), '..'), '../ specifies working dir is one dir down')
  console.log(init)

  init = getName({ options: cmd(npmInit, '../../') })
  t.notOk(init.name, 'Project name not passed')
  t.equal(init.folder, join(process.cwd(), '..', '..'), '../ specifies working dir is one dir down')
  console.log(init)

  t.throws(() => {
    getName({ options: cmd(npmInit, '/') })
  }, 'Passing root throws error')
})
