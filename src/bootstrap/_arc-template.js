let { join } = require('path')
let { existsSync, writeFileSync } = require('fs')

module.exports = function arcTemplate ({ name, folder, standalone, update, runtime }) {
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
  let dotArc =      join(folder, '.arc')
  // FIXME add app.arc, arc.toml and arc.yml
  let arcDotJSON =  join(folder, 'arc.json')
  let arcDotYAML =  join(folder, 'arc.yaml')

  let initialized = existsSync(appDotArc) ||
                    existsSync(dotArc) ||
                    existsSync(arcDotJSON) ||
                    existsSync(arcDotYAML)
  if (initialized) {
    // Do nothing if already initialized
    if (standalone) {
      update.done('Existing Architect project manifest found')
    }
  }
  else {
    // This is used further down the line in @arc/arc processes to ensure correctly ordered printing
    process.env.INITIALIZED = true
    writeFileSync(appDotArc, arcFile)
    if (standalone) {
      update.done('Created Architect project manifest (app.arc)')
    }
  }
}
