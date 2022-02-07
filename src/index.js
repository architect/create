let { sep } = require('path')
let { updater } = require('@architect/utils')
let { version } = require('../package.json')
let banner = require('./_banner')
let { aliases, runtimes, runtimeList } = require('lambda-runtimes')
let getName = require('./_get-name')
let bootstrap = require('./bootstrap')

let writeConfigs = require('./write-configs')
let writePlugin = require('./write-plugin')
let writeFunctions = require('./write-functions')
let writeStatic = require('./write-static')
let installArc = require('./_install-arc')

/**
 * Cannonical Architect code generator
 *   Assumes an project is already bootstrapped
 *
 * Rules:
 * - Create dep-free functions
 * - Min code possible
 * - Only one comment at the top of the file
 * - Add `config.arc` only if runtime configuration deems it necessary
 *
 * @param {Object} params - Object of params
 * @param {Function} callback - a node style errback
 * @returns {Promise} - (if no callback is supplied)
 */
module.exports = async function create (params = {}, callback) {
  let { install, inventory, plugin, runtime, standalone, update } = params
  if (!update) update = updater('Create')

  // Node version check for the `npm init @architect` path
  let { node } = process.versions
  let nodeVer = Number(node.split('.')[0])
  if (nodeVer < 14) {
    update.error('Sorry, Architect Create requires Node 14 and above')
    process.exit(1)
  }
  // TODO: This blows up 12 if required in global; move this back after 12 is EOL
  // eslint-disable-next-line
  let _inventory = require('@architect/inventory')

  let promise
  if (!callback) {
    promise = new Promise(function ugh (res, rej) {
      callback = function errback (err, result) {
        err ? rej(err) : res(result)
      }
    })
  }

  try {
    // Validate the runtime
    if (runtime && (runtime !== 'deno' &&
                  !runtimes[runtime] &&
                  !runtimeList.includes(runtime)) &&
                  !aliases[runtime]) {
      update.error(`Invalid runtime specified: ${runtime}`)
      process.exit(1)
    }

    // Get the folder name so we know where to inventory
    if (params.folder === '/') {
      update.error('Please specify a valid project name or path')
      process.exit(1)
    }

    if (standalone) {
    // Print banner
      banner(version)
    }

    // Establish the project name and intended folder
    let { name, folder } = getName(params)

    // Get Inventory to determine whether we need to bootstrap a manifest
    if (!inventory) {
      params.inventory = await _inventory({ cwd: folder })
    }

    if (plugin) {
      return writePlugin(params, callback)
    }

    // Bootstrap the project on the filesystem, including new dirs, app.arc manifest, etc.
    bootstrap({ ...params, name, folder })

    // These are the boilerplate-enabled pragmas
    let pragmas = [ 'http', 'events', 'queues', 'scheduled', 'static', 'tables-streams', 'ws', 'customLambdas' ]

    // Re-seed the inventory since we may now have a new manifest
    inventory = await _inventory({ cwd: folder })

    // Create dirs (and necessary config.arc files) that do not yet exist
    let dirs = writeConfigs({ ...params, pragmas, inventory })

    if (dirs.length) {
      // One final inventory run now that we have function config files
      inventory = await _inventory({ cwd: folder })

      writeFunctions({ ...params, dirs, inventory })
      writeStatic({ folder, inventory })

      dirs.forEach(d => {
        let dir = d.src.replace(process.cwd(), '')
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
  catch (err) {
    callback(err)
  }

  return promise
}
