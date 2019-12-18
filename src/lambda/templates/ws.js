let learn = 'learn more about WebSocket functions here: https://arc.codes/primitives/ws'

let nodejs = `// ${learn}
exports.handler = async function ws (req) {
  console.log(JSON.stringify(req, null, 2))
  return {statusCode: 200}
}`

let deno = `import { Context, Event } from "https://deno.land/x/lambda/mod.ts";

export async function handler(event: Event, context: Context) {
  return {
    statusCode: 200,
    body: \`Welcome to deno \${Deno.version.deno} 🦕\`
  };
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

module.exports = {nodejs, deno, ruby, python}
