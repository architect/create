#!/usr/bin/env node
let create = require('.')
let banner = require('./src/bootstrap/_banner')
let bootstrap = require('./src/bootstrap')
let getName = require('./src/bootstrap/_get-name')
let { version } = require('./package.json')
let { updater } = require('@architect/utils')
let _inventory = require('@architect/inventory')
let simpleStatic = require('./src/simple-static')
let update = updater('Create')

/**
 * `arc create`
 *
 * Idempotently initializes new Architect projects
 *
 * opts
 * -s|--static|static ........... init a static app
 * -r|--runtime|runtime ......... set up with one of node, deno, python, or ruby
 * -v|--verbose|verbose ......... prints all output to console
 */

let isRuntime = opt => opt === 'runtime' || opt === '--runtime' || opt === '-r'
let isVerbose = opt => opt === 'verbose' || opt === '--verbose' || opt === '-v'
let isStatic =  opt => opt === 'static' || opt === '--static' || opt === '-s'
let noInstall = opt => opt === 'noinstall' || opt === '--no-install' || opt === '-n'

// eslint-disable-next-line
async function cmd (options) {
  options = options || process.argv // passed-in options only used for testing

  // Get the folder name so we know where to inventory
  let { folder } = getName({ options, update })
  let inventory = await _inventory({ cwd: folder })

  // Print banner
  banner({ inventory, version })

  if (options.some(isStatic)) {
    // just bail early here ... I don't use understand the code below so just stubbing in
    return simpleStatic()
  }

  // Populate basic project files
  let opts = {
    verbose: options.some(isVerbose),
    noInstall: options.some(noInstall),
    runtime: options.some(isRuntime) ? options.slice(options.findIndex(isRuntime))[1] : false,
  }
  // Used by bootstrap to differentiate between arc create and preflight bootstrap calls
  // (for testing we wanna be able to override it so we dont npm install all the things during integration tests)
  let standalone = opts.noInstall ? false : true

  // Bootstrap the project on the filesystem, including new dirs, npm i, app.arc manifest, etc.
  let { install } = bootstrap({ options, inventory, standalone, update, runtime: opts.runtime })
  // re-seed the inventory since we may now have a new manifest due to bootstrap creating a new project
  inventory = await _inventory({ cwd: folder })

  return create({ options: opts, inventory, folder, install, standalone, update })
}

module.exports = cmd

// allow direct invoke
if (require.main === module) {
  (async function () {
    try {
      await cmd()
    }
    catch (err) {
      update.error(err)
      process.exit(1)
    }
  })()
}
