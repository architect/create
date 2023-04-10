let writeTemplate = require('./write-template')
let writeCode = require('./write-code')

module.exports = async function writeFunctions (params) {
  let { dirs, inventory } = params
  let { lambdasBySrcDir } = inventory.inv
  let prefs = inventory.inv._project.preferences
  let templates = prefs?.create?.templates

  for (let dir of dirs) {
    let { pragma, src } = dir
    let lambda = lambdasBySrcDir[src]
    let template = templates?.[pragma]
    if (template) {
      writeTemplate(lambda, template)
    }
    else {
      await writeCode(lambda, inventory)
    }
  }
}
