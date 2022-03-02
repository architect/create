let { sep } = require('path')
let { writeFileSync } = require('fs')
let { aliases } = require('lambda-runtimes')
let http = require('./templates/http')
let events = require('./templates/events')
let queues = require('./templates/queues')
let ws = require('./templates/ws')
let scheduled = require('./templates/scheduled')
let tablesStreams = require('./templates/tables-streams')

module.exports = function writeCode (lambda) {
  let { src, build, handlerFile, pragma, config, body } = lambda
  let { runtime, runtimeConfig } = config

  let filepath = handlerFile
  if (handlerFile.includes(build)) {
    filepath = filepath.replace(build, src)
  }

  let handler = filepath.replace(process.cwd(), '')
  if (handler[0] === sep) handler = handler.substr(1)

  // TODO This is a bit hacky and needs some improvement; custom runtime plugins should write proper boilerplate code (see: `body` prop from Arc 9.x plugins)
  let configuredRuntime = runtimeConfig?.baseRuntime || aliases[runtime] || runtime
  let run
  if (configuredRuntime.startsWith('deno'))   run = 'deno'
  if (configuredRuntime.startsWith('node'))   run = 'node'
  if (configuredRuntime.startsWith('python')) run = 'python'
  if (configuredRuntime.startsWith('ruby'))   run = 'ruby'
  if (!run) throw ReferenceError(`Valid runtime not found: ${configuredRuntime}`)

  let types = { http, events, queues, ws, scheduled, 'tables-streams': tablesStreams, customLambdas: events }
  if (!body) body = pragma === 'http'
    ? types[pragma][run](handler)
    : types[pragma][run]
  writeFileSync(filepath, body)
}
