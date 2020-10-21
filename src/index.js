let { updater } = require('@architect/utils')
let inventory = require('@architect/inventory')
let parallel = require('run-parallel')
let code = require('./lambda')
let assets = require('./static')
let bootstrap = require('./bootstrap')
let installArc = require('./_install-arc')

/**
 * Cannonical Architect code generator
 *   Assumes an project is already bootstrapped
 *
 * Rules:
 * - Go fast: create an entire project in one shot in parallel
 * - Create dep-free functions
 * - Min code possible
 * - Only one comment at the top of the file
 * - Add `.arc-config` by default
 *
 * @param {Object} params - Object of params
 * @param {Function} callback - a node style errback
 * @returns {Promise} - (if no callback is supplied)
 */
// eslint-disable-next-line
module.exports = async function create (params = {}, callback) {
  // Although create should be synchronous, callers may await it, so keep it async

  let { options = {}, folder = process.cwd(), install, standalone, update } = params

  let promise
  if (!callback) {
    promise = new Promise(function ugh (res, rej) {
      callback = function errback (err, result) {
        err ? rej(err) : res(result)
      }
    })
  }

  if (!update) update = updater('Create')

  try {
    let { inventory: inv } = await inventory({ cwd: folder })
    let { http, events, queues, scheduled, static, streams, ws } = inv

    let supported = [ 'node', 'deno', 'ruby', 'python', 'rb', 'py', 'js' ]
    let node = 'nodejs12.x'
    let deno = 'deno'
    let ruby = 'ruby2.7'
    let python = 'python3.8'

    let runtime = inv._project.defaultFunctionConfig.runtime
    let override = options.runtime
    if (supported.includes(override)) {
      let runtimes = { node, ruby, python, rb: ruby, py: python, js: node, deno }
      runtime = runtimes[override]
    }

    let functions = []

    let binder = {}
    let lambdae = [ 'http', 'events', 'queues', 'scheduled', 'static', 'streams', 'ws' ]
    lambdae.forEach(type => {
      binder[type] = fn => code.bind({}, { ...fn, type, runtime })
    })

    // Generate minimal static assets and Lambdae
    if (static)     functions.push(assets.bind({}, { folder, inv }))
    if (http)       functions.push(...http.map(binder.http))
    if (events)     functions.push(...events.map(binder.events))
    if (queues)     functions.push(...queues.map(binder.queues))
    if (scheduled)  functions.push(...scheduled.map(binder.scheduled))
    if (ws)         functions.push(...ws.map(binder.ws))
    if (streams)    functions.push(...streams.map(binder.streams))

    parallel(functions, function done (err, results) {
      if (err) callback(err)
      else {
        let dirs = [ ...new Set(results) ].filter(d => d)
        if (dirs.length) {
          dirs.forEach(dir => update.done(`Created new project files in ${dir}`))
        }
        if (install && standalone) {
          installArc({ folder, update }, callback)
        }
        else {
          if (standalone) update.done('Done!')
          callback()
        }
      }
    })
  }
  catch (err) {
    callback(err)
  }

  return promise
}

module.exports.bootstrap = bootstrap
