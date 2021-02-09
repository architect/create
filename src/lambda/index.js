let { existsSync, mkdirSync } = require('fs')
let { join } = require('path')
let series = require('run-series')
let getExtension = require('./get-extension')
let writeArcConfig = require('./write-arc-config')
let writeTemplate = require('./write-template')
let writeCode = require('./write-code')

/**
 * @param {string} type - required. one of: http, event, queue, table, ws
 * @param {string} runtime - required. one of:  node, deno, ruby, python
 * @param {string} method - optional. one of: get, post, put, delete, patch
 * @param {string} path - optional. of the format: /foo/:bar/baz
 * @param {string} name - optional. of the format: hello-world-2020
 */
module.exports = function code (params, callback) {
  let { arcStaticAssetProxy, src, type, runtime, prefs, body } = params

  // Immediate bail if source dir already exists
  if (arcStaticAssetProxy || existsSync(src)) {
    callback()
  }
  else {
    let handlerFile = join(src, `index.${getExtension(runtime)}`)
    mkdirSync(src, { recursive: true })

    series([
      function code (callback) {
        let templates = prefs && prefs.create && prefs.create.templates
        let template = templates && templates[type]
        if (template) {
          writeTemplate({
            template,
            handlerFile
          }, callback)
        }
        else {
          writeCode({
            type,
            runtime,
            handlerFile,
            body
          }, callback)
        }
      },
      function config (callback) {
        writeArcConfig({
          configPath: join(src, `config.arc`),
          runtime
        }, callback)
      },
    ], function done (err) {
      if (err) callback(err)
      else callback(null, src)
    })
  }
}
