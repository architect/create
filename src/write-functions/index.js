let writeTemplate = require('./write-template')
let writeCode = require('./write-code')

module.exports = function writeFunctions (params) {
  let { dirs, inventory } = params
  let { lambdasBySrcDir } = inventory.inv
  let prefs = inventory.inv._project.preferences
  let templates = prefs?.create?.templates

  dirs.forEach(({ pragma, src }) => {
    let lambda = lambdasBySrcDir[src]
    let template = templates?.[pragma]
    if (template) {
      writeTemplate(template, lambda)
    }
    else {
      writeCode(lambda)
    }
  })
}
