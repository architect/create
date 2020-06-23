let { writeFile } = require('fs')

module.exports = function writeArcConfig ({ configPath, runtime }, callback) {
  let config = `@aws
runtime ${runtime}
# memory 1152
# timeout 30
# concurrency 1
`
  writeFile(configPath, config, callback)
}
