let { resolve, sep } = require('path')

module.exports = function getProjectName (params) {
  let { name, folder } = params

  if (!folder) folder = process.cwd()
  else folder = resolve(process.cwd(), folder)

  if (!name) {
    name = resolve(folder).split(sep).reverse().shift()
  }

  return { name, folder }
}
