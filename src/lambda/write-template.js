let { existsSync, readFileSync, writeFile } = require('fs')

module.exports = function writeTemplate ({ handlerFile, template }, callback) {
  if (!existsSync(template)) {
    throw Error(`Custom function template not found: ${template}`)
  }
  let body = readFileSync(template).toString()
  writeFile(handlerFile, body, callback)
}
