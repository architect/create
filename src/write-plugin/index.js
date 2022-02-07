let { join } = require('path')
let { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs')

module.exports = function writeNewPlugin (params, callback) {
  let { inventory, plugin, update } = params
  let { inv } = inventory
  let { cwd } = inv._project

  let pluginPath = join(cwd, 'src', 'plugins', plugin)
  if (existsSync(pluginPath)) {
    let msg = `Create error: plugin folder already exists ${pluginPath}`
    return callback(Error(msg))
  }

  let template = readFileSync(join(__dirname, 'plugin.js')).toString()
  let pluginFile = join(pluginPath, 'index.js')
  mkdirSync(pluginPath, { recursive: true })
  writeFileSync(pluginFile, template)
  update.status(
    `Created new plugin at: ${join('src', 'plugins', plugin)}`,
    `Add '${plugin}' to your project manifest's @plugins pragma`
  )
  callback()
}
