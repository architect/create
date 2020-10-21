let { existsSync, mkdirSync } = require('fs')
let { join } = require('path')
let parallel = require('run-parallel')
let getExtension = require('./get-extension')
let writeArcConfig = require('./write-arc-config')
let writeCode = require('./write-code')

/**
 * @param {string} type - required. one of: http, event, queue, table, ws
 * @param {string} runtime - required. one of:  node, deno, ruby, python
 * @param {string} method - optional. one of: get, post, put, delete, patch
 * @param {string} path - optional. of the format: /foo/:bar/baz
 * @param {string} name - optional. of the format: hello-world-2020
 */
module.exports = function code (params, callback) {
  let { arcStaticAssetProxy, src, type, runtime } = params

  // Immediate bail if source dir already exists
  if (arcStaticAssetProxy || existsSync(src)) {
    callback()
  }
  else {
    let handlerFile = join(src, `index.${getExtension(runtime)}`)
    mkdirSync(src, { recursive: true })

    parallel({
      config (callback) {
        writeArcConfig({
          configPath: join(src, `config.arc`),
          runtime
        }, callback)
      },
      code (callback) {
        writeCode({
          type,
          runtime,
          handlerFile
        }, callback)
      }
    }, function done (err) {
      if (err) callback(err)
      else callback(null, `src/${type}`)
    })
  }
}
