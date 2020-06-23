/**
 * @param {string} runtime - string that starts with: node, python, ruby
 * @returns {string} one of: js, py or rb
 */
module.exports = function getExtension (runtime) {
  let ext = rt => runtime.startsWith(rt)
  if (ext('node')) return 'js'
  if (ext('deno')) return 'ts'
  if (ext('python')) return 'py'
  if (ext('ruby')) return 'rb'
  throw Error('invalid runtime')
}
