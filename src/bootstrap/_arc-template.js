let {join} = require('path')
let fs = require('fs')
let exists = fs.existsSync

module.exports = function arcTemplate ({name, folder, update}) {
  // most basic default Architect app possible
  let arcFile = `@app
${name}

@http
get /

## Uncomment the following lines to deploy to AWS!
# @aws
# profile default
# region us-west-1
# bucket your-private-deploy-bucket
  `

  let pathToArc =   join(folder, '.arc')
  let pathToJSON =  join(folder, 'arc.json')
  let pathToYAML =  join(folder, 'arc.yaml')
  let pathToApp =   join(folder, 'app.arc')

  let initialized = exists(pathToArc) ||
                    exists(pathToJSON) ||
                    exists(pathToYAML) ||
                    exists(pathToApp)
  if (initialized) {
    update.done('Existing Architect project manifest (.arc) found')
  }
  else {
    // This is used further down the line in @arc/arc processes
    // TODO maybe pass params between 'before' fns so we don't have to set an env var?
    process.env.INITIALIZED = true
    fs.writeFileSync(pathToArc, arcFile)
    update.done('Created Architect project manifest (.arc)')
  }
}
