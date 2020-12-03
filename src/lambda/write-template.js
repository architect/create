let { existsSync, readFileSync, writeFile } = require('fs')
let { join, resolve } = require('path')
let { homedir } = require('os')

module.exports = function writeTemplate ({ handlerFile, template }, callback) {
  let path = template[0] === '~' ? join(homedir(), template.substr(1)) : resolve(template)
  if (!existsSync(path)) {
    throw Error(`Custom function template not found: ${template}`)
  }
  let body = readFileSync(path).toString()
  writeFile(handlerFile, body, callback)
}
