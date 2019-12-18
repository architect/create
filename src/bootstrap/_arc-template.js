let {join} = require('path')
let fs = require('fs')
let exists = fs.existsSync

module.exports = function arcTemplate({name, folder, standalone, update, runtime}) {
  // most basic default Architect app possible
  let arcFile = `@app
${name}

@http
get /

@aws
runtime ${runtime}
# profile default
# region us-west-1
# bucket your-private-deploy-bucket
  `

  let pathToArc =   join(folder, '.arc')
  // FIXME add app.arc, arc.toml and arc.yml
  let pathToJSON =  join(folder, 'arc.json')
  let pathToYAML =  join(folder, 'arc.yaml')
  let pathToApp =   join(folder, 'app.arc')

  let initialized = exists(pathToArc) ||
                    exists(pathToJSON) ||
                    exists(pathToYAML) ||
                    exists(pathToApp)
  if (initialized) {
    if (standalone)
      update.done('Existing Architect project manifest (.arc) found')
  }
  else {
    // This is used further down the line in @arc/arc processes to ensure correctly ordered printing
    process.env.INITIALIZED = true
    fs.writeFileSync(pathToArc, arcFile)
    if (standalone)
      update.done('Created Architect project manifest (.arc)')
  }
}
