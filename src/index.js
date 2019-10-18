let {readArc, updater} = require('@architect/utils')
let parallel = require('run-parallel')
let code = require('./lambda')
let assets = require('./public')
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
module.exports = function create (params, callback) {
  let {options={}, folder=process.cwd(), install, standalone, update} = params

  let promise
  if (!callback) {
    promise = new Promise(function ugh(res, rej) {
      callback = function errback(err, result) {
        err ? rej(err) : res(result)
      }
    })
  }

  if (!update) update = updater('Create')
  let {arc} = readArc({cwd: folder})

  let supported = ['node', 'ruby', 'python', 'rb', 'py', 'js']

  let node = 'nodejs10.x'
  let ruby = 'ruby2.5'
  let python = 'python3.7'

  let find = setting=> setting[0] === 'runtime'
  let runtime = arc.aws && arc.aws.some(find)? arc.aws.find(find)[1] : node
  let override = options.runtime
  if (supported.includes(override)) {
    let runtimes = {node, ruby, python, rb:ruby, py:python, js:node}
    runtime = runtimes[override]
  }

  let functions = []

  // generate ./public with minimal set of static assets
  if (arc.static)
    functions = functions.concat(assets.bind({}, {folder}))

  // generate minimal lambda functions
  if (arc.http) {
    let type = 'http'
    functions = functions.concat(arc.http.map(route=> {
      return code.bind({}, {type, runtime, method: route[0], path: route[1], folder})
    }))
  }

  if (arc.events) {
    let type = 'events'
    functions = functions.concat(arc.events.map(name=> {
      return code.bind({}, {type, runtime, name, folder})
    }))
  }

  if (arc.queues) {
    let type = 'queues'
    functions = functions.concat(arc.queues.map(name=> {
      return code.bind({}, {type, runtime, name, folder})
    }))
  }

  if (arc.scheduled) {
    let type = 'scheduled'
    functions = functions.concat(arc.scheduled.map(tuple=> {
      let name = tuple.shift()
      return code.bind({}, {type, runtime, name, folder})
    }))
  }

  if (arc.ws) {
    let type = 'ws'
    let defaults = ['default', 'connect', 'disconnect']
    functions = functions.concat(Array.from(new Set([...defaults, ...arc.ws])).map(name=> {
      return code.bind({}, {type, runtime, name, folder})
    }))
  }

  if (arc.tables) {
    let type = 'tables'
    let results = []
    arc.tables.forEach(table=> {
      let name = Object.keys(table)[0]
      let hasStream = table[name].hasOwnProperty('stream') && !!(table[name].stream)
      if (hasStream) {
        results.push(code.bind({}, {type, runtime, name, folder}))
      }
    })
    if (results.length > 0) {
      functions = functions.concat(results)
    }
  }

  parallel(functions, function done(err, results) {
    if (err) callback(err)
    else {
      let dirs = [...new Set(results)].filter(d => d)
      if (dirs.length) {
        dirs.forEach(dir => update.done(`Created new project files in ${dir}`))
      }
      if (install && standalone) {
        installArc({folder, update}, callback)
      }
      else {
        if (standalone)
          update.done('Done!')
        callback()
      }
    }
  })

  return promise
}

module.exports.bootstrap = bootstrap
