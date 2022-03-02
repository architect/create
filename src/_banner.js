let chalk = require('chalk')
let { existsSync, readFileSync } = require('fs')
let { join } = require('path')
let { chars } = require('@architect/utils')

module.exports = function printBanner (version = '') {
  // Boilerplate
  let log = (label, value) => console.log(chalk.grey(`${label.padStart(12)} ${chars.buzz}`), chalk.cyan(value))

  let ver = `Architect Create ${version}`

  // Try to use the Arc version instead of create
  let arcLocalPackage = join(__dirname, '..', '..', 'architect', 'package.json')
  let arcGlobalPackage = join(__dirname, '..', '..', '..', '..', 'package.json')

  let update = pkg => {
    if (pkg.name === '@architect/architect') {
      ver = `Architect ${pkg.version}`
    }
  }
  if (existsSync(arcLocalPackage)) {
    let pkg = JSON.parse(readFileSync(arcLocalPackage))
    update(pkg)
  }
  else if (existsSync(arcGlobalPackage)) {
    let pkg = JSON.parse(readFileSync(arcGlobalPackage))
    update(pkg)
  }

  console.log() // Space
  log('Version', ver)
  log('cwd', process.cwd())
  console.log() // Space
}
