let learn = 'learn more about WebSocket functions here: https://arc.codes/ws'

let node = `// ${learn}
exports.handler = async function ws (req) {
  console.log(JSON.stringify(req, null, 2))
  return {statusCode: 200}
}`

let deno = `// ${learn}
export async function handler (event: object) {
  console.log(JSON.stringify(event, null, 2))
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
  return {statusCode: 200}`

module.exports = { node, deno, ruby, python }
