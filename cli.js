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
 * -s|--static .......... init a static app
 * -r|--runtime ......... set up with one of node, deno, python, or ruby
 * -v|--verbose ......... prints all output to console
 */
async function cmd (opts = {}) {
  let alias = {
    name: [ 'n' ],
    noInstall: [ 'noinstall' ],
    runtime: [ 'r' ],
    static: [ 's' ],
    verbose: [ 'v' ],
  }
  let string = [ 'name', 'runtime' ]
  let args = minimist(process.argv.slice(2), { alias, string })
  let { _ } = args
  if ([ 'create', '@architect' ].includes(_[0])) _.splice(0, 1)

  let install = opts.install
  if (typeof args.install === 'boolean') install = args.install
  if (typeof args.noInstall === 'boolean') install = !args.noInstall

  let params = {
    name: opts.name || args.name,
    folder: opts.folder || _[0],
    install,
    runtime: opts.runtime || args.runtime,
    standalone: opts.standalone,
    static: opts.static || args.static,
    update,
    verbose: opts.verbose || args.verbose,
  }
  return create(params)
}

module.exports = cmd

// allow direct invoke
if (require.main === module) {
  (async function () {
    try {
      // If invoked by npm init, then we probably do need to `install`
      let options = {
        install: true,
        standalone: true,
      }
      // If invoked by Architect, assume installation is unncessary
      if (process.env.ARC_ENV) options.install = false
      await cmd(options)
    }
    catch (err) {
      update.error(err)
      process.exit(1)
    }
  })()
}
