let parallel = require('run-parallel')
let { existsSync, mkdirSync, writeFile } = require('fs')
let { join } = require('path')

let html = require('./templates/html')
let css = require('./templates/css')
let mjs = require('./templates/mjs')

/**
 * generates
 * - {public|arc.static.folder}/index.html
 * - {public|arc.static.folder}/index.css
 * - {public|arc.static.folder}/index.js
 */
module.exports = function assets ({ folder, inv }, callback) {
  // Only create a static asset folder if no root handler is defined, and no folder already exists
  let asap = inv._project.rootHandler === 'arcStaticAssetProxy'
  let staticFolder = inv.static.folder && join(folder, inv.static.folder)
  if (asap && (staticFolder && !existsSync(staticFolder))) {
    mkdirSync(staticFolder, { recursive: true })
    parallel([
      writeFile.bind({}, join(staticFolder, 'index.html'), html),
      writeFile.bind({}, join(staticFolder, 'index.css'), css),
      writeFile.bind({}, join(staticFolder, 'index.js'), mjs),
    ],
    function done (err) {
      if (err) callback(err)
      else callback(null, `${staticFolder}/`)
    })
  }
  else callback()
}
