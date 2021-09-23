let learn = 'learn more about DynamoDB table stream functions here: https://arc.codes/primitives/tables#stream'

let nodejs = `// ${learn}
exports.handler = async function table (event) {
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

let php = `<?php
// ${learn}
function handler($event, $context)
{
  print_r($event);
  return true;
}`

module.exports = { nodejs, deno, ruby, python, php }
