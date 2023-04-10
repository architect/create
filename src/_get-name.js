let { resolve, sep } = require('path')

module.exports = function getProjectName (params) {
  let { cwd, name, folder } = params

  if (!folder) folder = cwd
  else folder = resolve(cwd, folder)

  if (!name) {
    name = resolve(folder).split(sep).reverse().shift()
  }

  return { name, folder }
}
