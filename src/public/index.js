let parallel = require('run-parallel')
let { existsSync, mkdirSync, writeFile } = require('fs')
let { join } = require('path')

let html = require('./templates/html')
let css = require('./templates/css')
let mjs = require('./templates/mjs')

/**
 * generates
 * - public/index.html
 * - public/index.css
 * - public/index.js
 */
module.exports = function assets ({ folder }, callback) {
  let publicPath = join(folder, 'public')
  if (existsSync(publicPath)) {
    callback()
  }
  else {
    mkdirSync(publicPath, { recursive: true })

    parallel([
      writeFile.bind({}, join('public', 'index.html'), html),
      writeFile.bind({}, join('public', 'index.css'), css),
      writeFile.bind({}, join('public', 'index.js'), mjs),
    ], function done (err) {
      if (err) callback(err)
      else {
        callback(null, 'public/')
      }
    })
  }
}
