let { sep } = require('path')
let { updater } = require('@architect/utils')
let _inventory = require('@architect/inventory')
let { version } = require('../package.json')
let banner = require('./_banner')
let { aliases, runtimes, runtimeList } = require('lambda-runtimes')
let getName = require('./_get-name')
let parallel = require('run-parallel')
let code = require('./lambda')
let _static = require('./static')
let bootstrap = require('./bootstrap')
let simpleStatic = require('./simple-static')
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
module.exports = async function create (params = {}, callback) {
  let { install, inventory, runtime, standalone, update } = params
  if (!update) update = updater('Create')

  let promise
  if (!callback) {
    promise = new Promise(function ugh (res, rej) {
      callback = function errback (err, result) {
        err ? rej(err) : res(result)
      }
    })
  }

  // Validate the runtime
  if (runtime && (runtime !== 'deno' &&
                  !runtimes[runtime] &&
                  !runtimeList.includes(runtime)) &&
                  !aliases[runtime]) {
    update.error(`Invalid runtime specified: ${runtime}`)
    process.exit(1)
  }
  if (runtime && aliases[runtime]) {
    runtime = aliases[runtime]
  }

  // Get the folder name so we know where to inventory
  if (params.folder === '/') {
    update.error('Please specify a valid project name or path')
    process.exit(1)
  }
  let { name, folder } = getName(params)
  if (!inventory) params.inventory = await _inventory({ cwd: folder })

  if (standalone) {
    // Print banner
    banner({ inventory, version })
  }

  // TODO [DEPRECATE]
  if (params.static) {
    return simpleStatic()
  }

  // Bootstrap the project on the filesystem, including new dirs, npm i, app.arc manifest, etc.
  bootstrap({ ...params, name, folder })

  // Re-seed the inventory since we may now have a new manifest due to bootstrap creating a new project
  inventory = await _inventory({ cwd: folder })

  try {
    let { inv } = inventory
    let prefs = inv._project.preferences

    // These are the boilerplate-enabled pragmas
    let pragmas = [ 'http', 'events', 'plugins', 'queues', 'scheduled', 'static', 'streams', 'ws' ]
    let templates = []
    pragmas.forEach(type => {
      if (!inv[type]) return
      if (type === 'static') {
        templates.push(_static.bind({}, { folder, inv }))
      }
      else {
        templates.push(
          ...inv[type].map(item => code.bind({}, { ...item, runtime, type, prefs }))
        )
      }
    })

    parallel(templates, function done (err, results) {
      if (err) callback(err)
      else {
        let dirs = [ ...new Set(results) ].filter(d => d)
        if (dirs.length) {
          dirs.forEach(d => {
            let dir = d.replace(process.cwd(), '')
            if (dir.startsWith(sep)) dir = dir.substr(1)
            update.done(`Created new project files in ${dir}${sep}`)
          })
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
