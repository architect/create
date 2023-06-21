let { existsSync, readFileSync, writeFileSync } = require('fs')
let { join, resolve } = require('path')
let { homedir } = require('os')

module.exports = function writeTemplate (lambdae, template) {
  if (!Array.isArray(lambdae)) lambdae = [ lambdae ] // Normalize possible multi-tenant Lambdas
  lambdae.forEach(lambda => {
    let { src, build, handlerFile } = lambda

    let filepath = handlerFile
    if (handlerFile.includes(build)) {
      filepath = filepath.replace(build, src)
    }

    let path = template[0] === '~'
      ? join(homedir(), template.substr(1))
      : resolve(template)
    if (!existsSync(path)) {
      throw Error(`Custom function template not found: ${template}`)
    }
    let body = readFileSync(path).toString()
    writeFileSync(filepath, body)
  })
}
