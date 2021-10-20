let writeTemplate = require('./write-template')
let writeCode = require('./write-code')

module.exports = function writeFunctions (params) {
  let { dirs, inventory } = params
  let { lambdasBySrcDir } = inventory.inv
  let prefs = inventory.inv._project.preferences
  let templates = prefs?.create?.templates

  dirs.forEach(({ pragma, src }) => {
    let { config, handlerFile, body } = lambdasBySrcDir[src]
    let template = templates?.[pragma]
    if (template) {
      writeTemplate({ template, handlerFile })
    }
    else {
      let runtime = params.runtime || config.runtime
      writeCode({ body, handlerFile, pragma, runtime })
    }
  })
}
