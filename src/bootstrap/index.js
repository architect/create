let path = require('path')
let exists = require('fs').existsSync
let mkdir = require('mkdirp').sync

let getName = require('./_get-name')
let arcTemplate = require('./_arc-template')
let arcPackage = require('./_arc-package')

/**
 * Architect project bootstrapper
 *   Bootstraps project meta files (if necessary)
 *
 * - Generates project folder
 * - Generates project manifest (.arc)
 * - Flags Architect for installation
 */
module.exports = async function maybeCreate({options=[], update}) {

  /**
   * First, figure out where we're working, and what our project name is
   */
  let {name, folder} = getName({options, update})
  // Get the name passed in, or use the current dir name
  let currentDirName = process.cwd().split(path.sep).reverse().shift()
  name = name || currentDirName

  /**
   * Next, create a dir and/or .arc file, if necessary
   */
  if (folder !== process.cwd && !exists(folder)) {
    update.status(
      'Bootstrapping new Architect project',
      `Project name: ${name}`,
      `Working dir: ${folder}`
    )
    mkdir(folder).sync
  }
  arcTemplate({name, folder, update})

  /**
   * Add a package.json to install Arc into (if necessary)
   */
  let install = arcPackage({options, name, folder})

  /**
   * Return folder (working dir) and install status
   */
  return {folder, install}
}
