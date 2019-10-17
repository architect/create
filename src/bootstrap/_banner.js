let chalk = require('chalk')
let {chars} = require('@architect/utils')

module.exports = function printBanner({version=''}) {
  // Boilerplate
  let log = (label, value) => console.log(chalk.grey(`${label.padStart(12)} ${chars.buzz}`), chalk.cyan(value))

  console.log() // Space
  log('version', `Architect Create ${version}`)
  log('cwd', process.cwd())
  console.log() // Space
}
