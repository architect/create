let { runtimes, aliases } = require('lambda-runtimes')

module.exports = function getSupportedRuntimes () {
  let supportedRuntimes = [ 'node', 'deno', 'ruby', 'python' ]

  let runtimeNames = supportedRuntimes.map(r => {
    let found = []
    Object.entries(aliases).forEach(([ k, v ]) => {
      if (v === r) found.push(k)
    })
    return found
  }).concat(supportedRuntimes)

  let supported = runtimeNames
    .map(r => [ r, runtimes[r] ? runtimes[r] : '' ])
    .concat(supportedRuntimes)
    .flat(2)
    .filter(Boolean)
    .sort()

  return [ ...new Set(supported) ]
}
