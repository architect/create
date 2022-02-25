let { existsSync, mkdirSync, writeFileSync } = require('fs')
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
module.exports = function assets (params) {
  let { folder, inventory } = params
  let { inv } = inventory
  if (!inv.static) return
  // Only create a static asset folder if no root handler is defined, and no folder already exists
  let asap = inv._project.rootHandler === 'arcStaticAssetProxy'
  let staticFolder = inv.static.folder && join(folder, inv.static.folder)
  if (asap && (staticFolder && !existsSync(staticFolder))) {
    mkdirSync(staticFolder, { recursive: true })
    writeFileSync(join(staticFolder, 'index.html'), html)
    writeFileSync(join(staticFolder, 'index.css'), css)
    writeFileSync(join(staticFolder, 'index.js'), mjs)
    return `${staticFolder}/`
  }
  return
}
