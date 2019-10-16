let {join} = require('path')
let fs = require('fs')
let exists = fs.existsSync

/**
 * Write basic boilerplate package.json to install @architect/architect (if necessary)
 * Return:
 * - `true`: install @architect/architect as the final step
 * - `false`: do not install @architect/architect
 */
module.exports = function arcPackage({options, name, folder}) {
  let isGlobal = options[0].includes === 'node' &&
                 options[1].includes === 'arc' &&
                 options[2] === 'create'
                 // || options[1].includes('arc-create')
  if (!isGlobal) {
    let package = {
      name,
      version: '0.0.0',
      description: "A fresh new Architect project!",
      scripts: {
        start: 'npx sandbox'
      },
      devDependencies: {}
    }
    let packageFile = join(folder, 'package.json')
    if (!exists(packageFile)) {
      fs.writeFileSync(packageFile, JSON.stringify(package,null,2))
      return true
    }
    else {
      let existing = JSON.parse(fs.readFileSync(packageFile).toString())
      if (existing.dependencies && existing.dependencies['@architect/architect'] ||
          existing.devDependencies && existing.devDependencies['@architect/architect']) {
        return false
      }
      return true
    }
  }
  return false
}
