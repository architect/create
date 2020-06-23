#!/usr/bin/env node
let create = require('.')
let banner = require('./src/bootstrap/_banner')
let bootstrap = require('./src/bootstrap')
let { version } = require('./package.json')
let { updater } = require('@architect/utils')
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

// eslint-disable-next-line
async function cmd () {
  // Print banner
  banner({ version })

  // Used by bootstrap to differentiate between arc create and preflight bootstrap calls
  let standalone = true
  let options = process.argv

  if (options.some(isStatic)) {
    // just bail early here ... I don't use understand the code below so just stubbing in
    return simpleStatic()
  }

  // Populate basic project files
  let opts = {
    verbose: options.some(isVerbose),
    runtime: options.some(isRuntime) ? options.slice(options.findIndex(isRuntime))[1] : false,
  }

  // Bootstrap the project on the filesystem, including new dirs, npm i, etc.
  let { folder, install } = bootstrap({ options, standalone, update, runtime: opts.runtime })

  return create({ options: opts, folder, install, standalone, update })
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
