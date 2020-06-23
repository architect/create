let learn = 'learn more about event functions here: https://arc.codes/primitives/events'

let nodejs = `// ${learn}
exports.handler = async function subscribe (event) {
  console.log(JSON.stringify(event, null, 2))
  return
}`

let deno = `// ${learn}
export async function handler (event: object) {
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
  return True`

module.exports = { nodejs, deno, ruby, python }
