let { join } = require('path')
let { existsSync, mkdirSync, writeFileSync } = require('fs')
let getSupportedRuntimes = require('./supported-runtimes')

module.exports = function writeArcConfigs (params) {
  let { pragmas, inventory, update } = params
  let { inv } = inventory
  let createRuntime = params.runtime    // What the user requested, if anything
  let projectRuntime = inv.aws?.runtime // What the project defaults to, if anything
  let supported = getSupportedRuntimes(inventory)

  // Figure out whether we have something valid to write to disk:
  // An unsupported Create runtime is specified, and project has no default runtime to fall back to
  let badCreateRuntime = createRuntime && !supported.includes(createRuntime)
  // Project has an unsupported default runtime, and no Create runtime is specified
  let badProjectRuntime = projectRuntime && !supported.includes(projectRuntime) && !createRuntime
  let skip = badCreateRuntime || badProjectRuntime

  let dirs = []
  pragmas.forEach(pragma => {
    if (inv[pragma] && pragma !== 'static') {
      inv[pragma].forEach(item => {
        let { name, config, src } = item

        // Lambda's runtime isn't yet fully reified, but may inherit its runtime from project manifest
        // So don't trust it, but maybe also trust it
        let lambdaRuntime = config.runtimeAlias || config.runtime

        if (existsSync(src)) return
        else if (skip) {
          update.status(`Ignoring @${pragma} ${name}, runtime not supported: ${createRuntime || projectRuntime}`)
        }
        else {
          mkdirSync(src, { recursive: true })
          dirs.push({ pragma, src })

          // Only write a config file if necessary; namely, its runtime differs from the project default:
          // Create runtime specified differs from Lambda's inherited runtime or runtime alias
          let createDiffers = createRuntime && (createRuntime !== lambdaRuntime)
          // Project has a default runtime, and the create runtime differs from it
          let projectAndCreateDiffer = projectRuntime && createRuntime && (createRuntime !== projectRuntime)

          if (createDiffers || projectAndCreateDiffer) {
            let runtime = createRuntime || config.runtimeAlias || config.runtime
            let configPath = join(src, 'config.arc')
            let arcConfig = `@aws
runtime ${runtime}
# memory 1152
# timeout 30
# concurrency 1
`
            writeFileSync(configPath, arcConfig)
          }
        }
      })
    }
  })
  return [ ...new Set(dirs) ].filter(Boolean)
}
