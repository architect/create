let learn = 'learn more about WebSocket functions here: https://arc.codes/primitives/ws'

let nodejs = `// ${learn}
exports.handler = async function subscribe(payload) {
  console.log(JSON.stringify(payload, null, 2))
  return {statusCode: 200}
}`

let ruby = `# ${learn}
def handler(event)
  puts event
  {statusCode: 200}
end`

let python = `# ${learn}
def handler(event, context):
  print(event)
  print(context)
  return {statusCode: 200}`

module.exports = {nodejs, ruby, python}
