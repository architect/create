let learn = 'learn more about HTTP functions here: https://arc.codes/http'
let css = /* css */`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .max-width-320 {
    max-width: 20rem;
  }
  .margin-left-8 {
    margin-left: 0.5rem;
  }
  .margin-bottom-16 {
    margin-bottom: 1rem;
  }
  .margin-bottom-8 {
    margin-bottom: 0.5rem;
  }
  .padding-32 {
    padding: 2rem;
  }
  .color-grey {
    color: #333;
  }
  .color-black-link:hover {
    color: black;
  }
`.split('\n').map(l => l.trim()).join(' ')

function html (lang, path) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Architect</title>
  <style>
    ${css}
  </style>
</head>
<body class="padding-32">
  <div class="max-width-320">
    <img src="https://assets.arc.codes/logo.svg" />
    <div class="margin-left-8">
      <div class="margin-bottom-16">
        <h1 class="margin-bottom-16">
          Hello from an Architect ${lang} function!
        </h1>
        <p class="margin-bottom-8">
          Get started by editing this file at:
        </p>
        <code>
          ${path}
        </code>
      </div>
      <div>
        <p class="margin-bottom-8">
          View documentation at:
        </p>
        <code>
          <a class="color-grey color-black-link" href="https://arc.codes">https://arc.codes</a>
        </code>
      </div>
    </div>
  </div>
</body>
</html>
`
}

let deno = path => `// ${learn}
export async function handler (event: object) {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: \`${html('deno', path)}\`
  };
}`

let node = path => `// ${learn}
exports.handler = async function http (req) {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: \`${html('Node.js', path)}\`
  }
}`

let ruby = path => `# ${learn}
def handler(req, context)
  {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: %q(${html('Ruby', path)})
  }
end`

let python = path => `# ${learn}
def handler(req, context):
  return {
    'statusCode': 200,
    'headers': {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    'body': """${html('Python', path)}"""
  }`

module.exports = { node, deno, ruby, python }
