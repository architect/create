let { join } = require('path')
let { writeFileSync } = require('fs')

module.exports = function arcTemplate (params) {
  let { name, folder, inventory, standalone, update, runtime } = params
  // Only add the @aws runtime setting into the Arc template if specified
  runtime = runtime ? `runtime ${runtime}\n` : ''

  // Most basic default Architect app possible
  let arcFile = `@app
${name}

@http
get /

${runtime ? '' : '# '}@aws
${runtime}# profile default
# region us-west-1
  `

  let appDotArc =   join(folder, 'app.arc')
  let hasManifest = inventory.inv._project.manifest
  // Do nothing if a manifest already exists
  if (hasManifest && standalone) {
    update.done('Existing Architect project manifest found')
  }
  else if (!hasManifest) {
    // This is used further down the line in @arc/arc processes to ensure correctly ordered printing
    process.env.INITIALIZED = true
    writeFileSync(appDotArc, arcFile)
    if (standalone) {
      update.done('Created Architect project manifest (app.arc)')
    }
  }
}
