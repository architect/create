let { writeFile } = require('fs')
let http = require('./templates/http')
let events = require('./templates/events')
let queues = require('./templates/queues')
let ws = require('./templates/ws')
let scheduled = require('./templates/scheduled')
let streams = require('./templates/streams')

module.exports = function writeCode ({ handlerFile, type, runtime, body }, callback) {
  let types = { http, events, queues, ws, scheduled, streams }
  let run = runtime.split(/\d/)[0]
  body = body || types[type][run]
  writeFile(handlerFile, body, callback)
}
