let { parse, resolve } = require('path')

module.exports = function getProjectName ({ options = [], update }) {
  // Known options
  let isVerbose = opt => opt === 'verbose' || opt === '--verbose' || opt === '-v'
  let isRuntime = opt => opt === 'runtime' || opt === '--runtime' || opt === '-r'

  // Grab runtime value for filtering
  let runtime = options.findIndex(isRuntime) === -1 ? null : options.findIndex(isRuntime) + 1
  // Filter known options from arg list
  let filtered = options.filter((opt, i) => {
    if (i === runtime) return false
    if (isVerbose(opt) || isRuntime(opt)) return false
    return true
  })
  let passedName = filtered[filtered.length - 1] || ''

  // Set up response
  let name
  let folder = process.cwd()

  // Bail if a name wasn't passed
  let isCmd = passedName === '@architect' ||
              passedName === 'create' ||
              passedName.includes('arc-create') // Run directly, manual testing
  if (isCmd || !passedName) {
    return { name, folder }
  }
  if (passedName === '/') {
    update.error('Please specify a valid project name')
    process.exit(1)
  }

  let pathParts = parse(passedName)
  // Don't return a name of path dots
  let isDots = pathParts.base === '.' || pathParts.base === '..'
  name = isDots ? undefined : pathParts.name

  if (pathParts.dir && pathParts.name || isDots) {
    folder = resolve(process.cwd(), passedName)
  }
  else {
    folder = process.cwd()
  }

  return { name, folder }
}
