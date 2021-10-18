let { sep } = require('path')
let { writeFile } = require('fs')
let http = require('./templates/http')
let events = require('./templates/events')
let queues = require('./templates/queues')
let ws = require('./templates/ws')
let scheduled = require('./templates/scheduled')
let streams = require('./templates/streams')

module.exports = function writeCode (params, callback) {
  let { handlerFile, type, runtime, body } = params
  let handler = handlerFile.replace(process.cwd(), '')
  if (handler[0] === sep) handler = handler.substr(1)

  let types = { http, events, queues, ws, scheduled, streams }
  let run = 'node'
  if (runtime.startsWith('deno'))   run = 'deno'
  if (runtime.startsWith('node'))   run = 'node'
  if (runtime.startsWith('python')) run = 'python'
  if (runtime.startsWith('ruby'))   run = 'ruby'

  if (!body) body = type === 'http'
    ? types[type][run](handler)
    : types[type][run]
  writeFile(handlerFile, body, callback)
}
