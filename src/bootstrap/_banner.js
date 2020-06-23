let chalk = require('chalk')
let { existsSync, readFileSync } = require('fs')
let { join } = require('path')
let { chars } = require('@architect/utils')

module.exports = function printBanner ({ version = '' }) {
  // Boilerplate
  let log = (label, value) => console.log(chalk.grey(`${label.padStart(12)} ${chars.buzz}`), chalk.cyan(value))

  let ver = `Architect Create ${version}`
  // Try to use the Arc version instead of create
  let arcPackage = join(__dirname, '..', '..', '..', '..', '..', 'package.json')
  if (existsSync(arcPackage)) {
    let pkg = JSON.parse(readFileSync(arcPackage).toString())
    ver = `Architect ${pkg.version}`
  }

  console.log() // Space
  log('Version', ver)
  log('cwd', process.cwd())
  console.log() // Space
}
