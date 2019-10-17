let learn = 'learn more about scheduled functions here: https://arc.codes/primitives/scheduled'

let nodejs = `// ${learn}
exports.handler = async function scheduled (event) {
  console.log(JSON.stringify(event, null, 2))
  return
}`

let ruby = `# ${learn}
def handler(event)
  puts event
  true
end`

let python = `# ${learn}
def handler(event, context):
  print(event)
  print(context)
  return True`

module.exports = {nodejs, ruby, python}
