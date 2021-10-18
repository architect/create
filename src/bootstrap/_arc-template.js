let { join } = require('path')
let { writeFileSync } = require('fs')

module.exports = function arcTemplate (params) {
  let { name, folder, inventory, standalone, update, runtime } = params

  let appDotArc =   join(folder, 'app.arc')
  let hasManifest = inventory.inv._project.manifest
  // Do nothing if a manifest already exists
  if (hasManifest && standalone) {
    update.done('Existing Architect project manifest found')
  }
  else if (!hasManifest) {
    // Most basic default Architect app possible
    let arcFile = `@app
${name}

@http
get /

${runtime ? '' : '# '}@aws
${runtime ? `runtime ${runtime}\n` : ''}# profile default
# region us-west-1
`

    writeFileSync(appDotArc, arcFile)
    if (standalone) {
      update.done('Created Architect project manifest (app.arc)')
    }
  }
}
