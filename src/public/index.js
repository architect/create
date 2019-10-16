let parallel = require('run-parallel')
let fs = require('fs')
let mkdir = require('mkdirp')
let {join} = require('path')

let html = require('./templates/html')
let css = require('./templates/css')
let mjs = require('./templates/mjs')

/**
 * generates
 * - public/index.html
 * - public/index.css
 * - public/index.js
 */
module.exports = function assets({folder}, callback) {
  let publicPath = join(folder, 'public')
  if (fs.existsSync(publicPath)) {
    callback()
  }
  else {
    mkdir.sync(publicPath)
    parallel([
      fs.writeFile.bind({}, join('public', 'index.html'), html),
      fs.writeFile.bind({}, join('public', 'index.css'), css),
      fs.writeFile.bind({}, join('public', 'index.js'), mjs),
    ], function done(err) {
      if (err) callback(err)
      else {
        callback(null, 'public/')
      }
    })
  }
}
