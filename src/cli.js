#!/usr/bin/env node
let { updater } = require('@architect/utils')
let create = require('.')
let minimist = require('minimist')
let update = updater('Create')

/**
 * `arc create`
 *
 * Idempotently initializes new Architect projects
 *
 * -n|--name ............ specify an app name
 * --noinstall .......... do not intall any Architect dependencies
 * -p|--plugin .......... init a fresh Architect pluin
 * -r|--runtime ......... set up with one of node, deno, python, or ruby
 * -v|--verbose ......... prints all output to console
 */
async function main (opts = {}) {
  // If invoked by Architect, assume installation is unncessary
  if (process.env.ARC_ENV) opts.install = false

  let alias = {
    name: [ 'n' ],
    noInstall: [ 'noinstall', 'no-install' ],
    plugin: [ 'p' ],
    runtime: [ 'r' ],
    verbose: [ 'v' ],
  }
  let string = [ 'name', 'plugin', 'runtime' ]
  let args = minimist(process.argv.slice(2), { alias, string })
  let { _ } = args
  if ([ '@architect', 'create', 'init' ].includes(_[0])) _.splice(0, 1)

  let install = opts.install
  if (typeof args.install === 'boolean') install = args.install
  if (typeof args.noInstall === 'boolean') install = !args.noInstall

  let plugin = args.plugin
  if (plugin === '') plugin = 'new-plugin'

  let params = {
    name:       args.name,
    folder:     _[0],
    install,
    inventory:  opts.inventory,
    plugin,
    runtime:    args.runtime,
    standalone: opts.standalone || process.env.ARC_ENV ? true : false,
    update,
    verbose:    args.verbose,
  }
  return create(params)
}

module.exports = main

// allow direct invoke
if (require.main === module) {
  (async function () {
    try {
      // If invoked by npm init, then we probably do need to `install`
      await main({
        install: true,
        standalone: true,
      })
    }
    catch (err) {
      update.error(err)
      process.exit(1)
    }
  })()
}
