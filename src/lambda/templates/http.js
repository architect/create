let learn = 'learn more about HTTP functions here: https://arc.codes/primitives/http'

function html (lang, ext) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Architect</title>
  <style>
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
  </style>
</head>
<body class="padding-32">
  <div class="max-width-320">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 267.07 50.23" class="margin-bottom-16"><g fill="#000000"><path d="M91.68 41.88L77.47 8.59c-.21-.66-1.06-1.01-1.73-1.01h-.44c-.68 0-1.5.46-1.77 1.08l-14.3 33.27c-.03.07-.05.15-.05.24 0 .32.27.58.59.58h3.97c.3 0 .59-.31.69-.52.03-.07 2.77-6.72 2.77-6.72h16.54l2.77 6.84s.21.6.86.6h3.59c.43 0 .79-.35.79-.78-.01-.11-.07-.29-.07-.29zM68.91 31.15l6.56-15.75 6.51 15.75zM158.14 30.27c0-6.31-4.06-10.47-9.98-10.47-3.38 0-5.82 1.42-7.24 3.28V8.34h-.01a.55.55 0 0 0-.55-.52h-3.73c-.3 0-.55.24-.55.54v33.85c0 .29.24.53.53.53h3.84c.29 0 .53-.24.53-.53v-11.7c.05-3.08 2.2-6.31 6.26-6.31 3.57 0 6.02 2.69 6.02 6.75v11.26c0 .29.24.53.53.53h3.84c.29 0 .53-.24.53-.53zM167 9.33c-1.91.05-3.42 1.32-3.42 3.28s1.52 3.33 3.42 3.33c1.96 0 3.47-1.37 3.47-3.33s-1.52-3.33-3.47-3.28zM217.73 31.15c0-.12 0-.25-.01-.36v-.04c0-.09 0-.18-.01-.27 0-.05-.01-.09-.01-.14-.03-.37-.06-.71-.08-.88-.73-5.75-4.84-9.64-10.69-9.64-6.8 0-11.55 5.09-11.55 11.69 0 6.7 5.14 11.69 12.13 11.69 4.4 0 7.03-1.43 8.64-2.69 0 0 .36-.25.14-.66l-1.62-2.71c-.14-.22-.55-.24-.82-.02-1.24.92-2.97 1.97-5.81 1.97-4.21 0-7.24-2.59-7.88-6.16h17.17c.26 0 .37-.22.37-.48 0 0 .02-.56.02-1.11v-.03c.01-.06.01-.11.01-.16zm-17.51-1.71c.73-3.52 3.33-5.67 6.85-5.67 3.23 0 5.77 2.25 6.02 5.67zM108.97 19.88s-.89-.07-1.36-.07c-4.01 0-6.7 2.2-7.63 4.84l-.17-3.89a.574.574 0 0 0-.57-.51h-3.06a.56.56 0 0 0-.56.56V42.2c0 .3.25.55.55.55h3.78c.3 0 .55-.24.56-.54V30.77c.05-3.18 2.2-6.31 6.41-6.31.66 0 1.65.17 1.65.17.3.04.53-.14.55-.4l.31-3.84c.02-.27-.2-.49-.46-.51zM128.84 37.37c.2-.11.43-.03.53.16l1.64 2.99c.1.19.03.4-.16.52l-.02.01c-1.54.95-3.71 2.13-7.52 2.13-7.24 0-12.23-5.09-12.23-11.64 0-6.65 5.33-11.74 12.23-11.74 3.85 0 6.16 1.18 7.68 2.24.07.05.28.23.11.52l-1.72 2.96c-.11.19-.34.24-.53.13l-.04-.03c-1.19-.74-2.8-1.37-4.96-1.37-4.65 0-7.78 3.08-7.78 7.29 0 4.11 3.13 7.19 7.58 7.19 2.39 0 3.94-.64 5.16-1.35zM168.97 20.24h-3.79c-.29 0-.53.24-.53.53l-.05 21.45c0 .29.24.53.53.53h3.83c.29 0 .53-.24.53-.53V20.77c0-.29-.23-.53-.52-.53zM192.03 37.81c-.06-.12-.45-.13-.88.11-.85.44-1.81.91-3.51.91-2.79 0-4.5-1.22-4.5-4.21V24.3h8.38c.29 0 .53-.24.53-.53v-3c0-.29-.24-.53-.53-.53h-8.38v-7.2c0-.29-.24-.53-.53-.53h-3.69c-.29 0-.53.24-.53.53v7.2h-4.17c-.29 0-.53.24-.53.53v3c0 .29.24.53.53.53h4.07v10.62c0 5.33 3.38 8.27 8.37 8.27 3.54 0 5.59-1.22 6.56-1.91.17-.19.27-.38.17-.59zM238.61 37.45c.2-.11.43-.03.53.16l1.64 2.99c.1.19.03.4-.16.52l-.02.01c-1.54.95-3.71 2.13-7.52 2.13-7.24 0-12.23-5.09-12.23-11.64 0-6.65 5.33-11.74 12.23-11.74 3.85 0 6.16 1.18 7.68 2.24.07.05.28.23.11.52l-1.72 2.96c-.11.19-.34.24-.53.13l-.04-.03c-1.19-.74-2.8-1.37-4.96-1.37-4.65 0-7.78 3.08-7.78 7.29 0 4.11 3.13 7.19 7.58 7.19 2.39 0 3.94-.64 5.16-1.35zM262.91 37.92c-.06-.12-.45-.13-.88.11-.85.44-1.81.91-3.51.91-2.79 0-4.5-1.22-4.5-4.21V24.41h8.38c.29 0 .53-.24.53-.53v-3c0-.29-.24-.53-.53-.53h-8.38v-7.2c0-.29-.24-.53-.53-.53h-3.69c-.29 0-.53.24-.53.53v7.2h-4.17c-.29 0-.53.24-.53.53v3c0 .29.24.53.53.53h4.07v10.62c0 5.33 3.38 8.27 8.37 8.27 3.54 0 5.59-1.22 6.56-1.91.17-.19.27-.38.17-.59zM27.7 1.44c-13.03 0-23.63 10.6-23.63 23.63S14.67 48.7 27.7 48.7s23.63-10.6 23.63-23.63S40.72 1.44 27.7 1.44zm16.22 34.63c-3.68 5.41-9.71 8.62-16.23 8.62-6.49 0-12.52-3.2-16.2-8.57l16.2-15.78zm3.4-11c0 2.52-.48 4.99-1.44 7.34L29.71 16.73c-1.11-1.11-2.92-1.12-4.02-.02L9.53 32.46c-.97-2.37-1.46-4.85-1.46-7.39 0-10.82 8.81-19.63 19.63-19.63s19.62 8.8 19.62 19.63z"/></g></svg>
    <div class="margin-left-8">
      <div class="margin-bottom-16">
        <h1 class="margin-bottom-16">
          Hello from ${lang}!
        </h1>
        <p class="margin-bottom-8">
          Get started by editing this file at:
        </p>
        <code>
          src/http/{your function}/index.${ext}
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

let deno = `// ${learn}
export async function handler (event: object) {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: \`${html('deno', 'ts')}\`
  };
}`

let nodejs = `// ${learn}
exports.handler = async function http (req) {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: \`${html('Node.js', 'js')}\`
  }
}`

let ruby = `# ${learn}
def handler(req)
  {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: %q(${html('Ruby', 'rb')})
  }
end`

let python = `# ${learn}
def handler(req, context):
  return {
    'statusCode': 200,
    'headers': {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    'body': """${html('Python', 'py')}"""
  }`

let php = `// ${learn}
function handler($req, $context)
{
  return [
    'statusCode' => 200,
    'headers' => [
      'cache-control' => 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type' => 'text/html; charset=utf8'
    ],
    'body' => "${html('PHP', 'php')}"
  ]
}`

module.exports = { nodejs, deno, ruby, python, php }
