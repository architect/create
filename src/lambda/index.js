let { existsSync, mkdirSync } = require('fs')
let { join } = require('path')
let series = require('run-series')
let writeArcConfig = require('./write-arc-config')
let writeTemplate = require('./write-template')
let writeCode = require('./write-code')

/**
 * @param {boolean} arcStaticAssetProxy - optional. identifies ASAP
 * @param {string} runtime - required. one of:  node, deno, ruby, python
 * @param {string} body - optional. custom template body
 * @param {string} type - optional. CLI/module-specified runtime
 * @param {string} type - required. one of: http, event, queue, table, ws
 * @param {object} prefs - optional. inventory preferences
 */
module.exports = function code (params, callback) {
  let { config, src, handlerFile, body, type, prefs } = params

  // Immediate bail if source dir already exists
  if (params.arcStaticAssetProxy || existsSync(src)) {
    callback()
  }
  else {
    let runtime = params.runtime || config.runtime
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
