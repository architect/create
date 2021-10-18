let { join } = require('path')
let { existsSync, readFileSync, writeFileSync } = require('fs')

/**
 * Write basic boilerplate package.json to install @architect/architect (if necessary)
 * Return:
 * - `true`: install @architect/architect as the final step
 * - `false`: do not install @architect/architect
 */
module.exports = function arcPackage ({ name, folder }) {
  let args = process.argv
  // Don't install if invoked from a globally installed @arc/arc
  let isGlobal = (args[0] && args[1] && args[2] &&
                  args[0].includes('node') &&  // Node invoke path may vary
                  args[1].includes('arc')) &&  // .. same deal with the Arc path
                  (args[2] === 'create' ||     // == 'arc create' via global install
                   args[2] === 'init')         // Backwards compat
  if (!isGlobal) {
    let packageFile = join(folder, 'package.json')
    if (!existsSync(packageFile)) {
      let package = {
        name,
        version: '0.0.0',
        description: 'A fresh new Architect project!',
        scripts: {
          start: 'npx sandbox'
        },
        devDependencies: {}
      }
      writeFileSync(packageFile, JSON.stringify(package, null, 2))
      return true
    }
    else {
      let existing = JSON.parse(readFileSync(packageFile).toString())
      if (existing.dependencies && existing.dependencies['@architect/architect'] ||
          existing.devDependencies && existing.devDependencies['@architect/architect']) {
        return false
      }
      return true
    }
  }
  return false
}
