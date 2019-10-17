let fs = require('fs')
let mkdir = require('mkdirp')
let {join} = require('path')
let parallel = require('run-parallel')
let {getLambdaName} = require('@architect/utils')

let getExtension = require('./get-extension')
let writeArcConfig = require('./write-arc-config')
let writeCode = require('./write-code')

/**
 * @param {string} type - required. one of: http, event, queue, table, ws
 * @param {string} runtime - required. one of:  node, ruby, python
 * @param {string} method - optional. one of: get, post, put, delete, patch
 * @param {string} path - optional. of the format: /foo/:bar/baz
 * @param {string} name - optional. of the format: hello-world-2020
 */
module.exports = function code({type, runtime, method, path, name, folder}, callback) {

  let dest = type === 'http'? `${method.toLowerCase()}${getLambdaName(path)}` : name
  let extension = getExtension(runtime)
  let basePath = join(folder, 'src', type, dest)
  let fullPath = join(basePath, `index.${extension}`)
  let configPath = join(basePath, `.arc-config`)

  // immediate bail if either file exists
  if (fs.existsSync(fullPath) || fs.existsSync(configPath)) {
    callback()
  }
  else {
    mkdir.sync(basePath)

    parallel({
      config(callback) {
        writeArcConfig({
          configPath,
          runtime
        }, callback)
      },
      code(callback) {
        writeCode({
          type,
          runtime,
          fullPath
        }, callback)
      }
    }, function done(err) {
      if (err) callback(err)
      else {
        callback(null, `src/${type}`)
      }
    })
  }
}
