let { readFileSync, writeFile } = require('fs')

module.exports = function writeTemplate ({ handlerFile, template }, callback) {
  let body = readFileSync(template).toString()
  writeFile(handlerFile, body, callback)
}
