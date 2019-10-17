#!/usr/bin/env node
let create = require('.')
let banner = require('./src/bootstrap/_banner')
let bootstrap = require('./src/bootstrap')
let {version} = require('./package.json')
let {updater} = require('@architect/utils')
let update = updater('Create')

/**
 * `arc create`
 * Idempotently initializes new Architect projects
 *
 * opts
 * -r|--runtime|runtime ......... set up with one of node, python, or ruby
 * -v|--verbose|verbose ......... prints all output to console
 */

let isRuntime = opt=> opt === 'runtime' || opt === '--runtime' || opt === '-r'
let isVerbose = opt=> opt === 'verbose' || opt === '--verbose' || opt === '-v'

async function cmd(opts=[], {folder, install}) {
  let options = {
    verbose: opts.some(isVerbose),
    runtime: opts.some(isRuntime) ? opts.slice(opts.findIndex(isRuntime))[1] : false
  }
  return create({options, folder, update, install})
}

module.exports = cmd

// allow direct invoke
if (require.main === module) {
  (async function() {
    try {
      let options = process.argv
      let standalone = true
      // Three steps
      // 1. Bootstrap the env via bannerprint
      banner({version})
      // 2. Bootstrap the project on the filesystem, including new dirs, npm i, etc.
      let {folder, install} = await bootstrap({options, standalone, update})
      // 3. Populate basic project files
      await cmd(options, {folder, install})
    }
    catch (err) {
      update.error(err)
      process.exit(1)
    }
  })();
}
