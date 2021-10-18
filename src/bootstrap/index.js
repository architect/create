let { existsSync, mkdirSync } = require('fs')

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
module.exports = function bootstrap (params) {
  let { name, folder, standalone, update } = params

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
  arcTemplate(params)

  /**
   * Add a package.json to install Arc into (if necessary)
   */
  let install = false
  if (standalone) {
    install = arcPackage({ name, folder })
  }

  /**
   * Return folder (working dir) and install status
   */
  return { folder, install }
}
