let path = require('path')
let { existsSync, mkdirSync } = require('fs')
let { updater } = require('@architect/utils')

let getName = require('./_get-name')
let arcTemplate = require('./_arc-template')
let arcPackage = require('./_arc-package')

/**
 * Architect project bootstrapper
 *   Bootstraps project meta files (if necessary)
 *
 * - Generates project folder
 * - Generates project manifest (app.arc)
 * - Flags Architect for installation
 */
module.exports = function bootstrap (params = {}) {
  let { options = [], inventory, runtime, standalone = false, update } = params
  if (!update) update = updater('Create')

  /**
   * First, figure out where we're working, and what our project name is
   */
  let { name, folder } = getName({ options, update })
  // Get the name passed in, or use the current dir name
  let currentDirName = process.cwd().split(path.sep).reverse().shift()
  name = name || currentDirName

  /**
   * Next, create a dir and/or app.arc file, if necessary
   */
  if (folder !== process.cwd() && !existsSync(folder)) {
    update.status(
      'Bootstrapping new Architect project',
      `Project name .. ${name}`,
      `Creating in ... ${folder}`
    )
    mkdirSync(folder, { recursive: true })
  }
  arcTemplate({ name, folder, inventory, standalone, update, runtime })

  /**
   * Add a package.json to install Arc into (if necessary)
   */
  let install = false
  if (standalone) {
    install = arcPackage({ options, name, folder })
  }

  /**
   * Return folder (working dir) and install status
   */
  return { folder, install }
}
