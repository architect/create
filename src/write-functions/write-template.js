let { existsSync, readFileSync, writeFileSync } = require('fs')
let { join, resolve } = require('path')
let { homedir } = require('os')

module.exports = function writeTemplate (params) {
  let { handlerFile, template } = params
  let path = template[0] === '~'
    ? join(homedir(), template.substr(1))
    : resolve(template)
  if (!existsSync(path)) {
    throw Error(`Custom function template not found: ${template}`)
  }
  let body = readFileSync(path).toString()
  writeFileSync(handlerFile, body)
}
