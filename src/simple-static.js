let { existsSync, mkdirSync, writeFileSync } = require('fs')
let join = require('path').join

/**
 * create a very minimal static app
 *
 * usage
 *
 * arc init --static ./foo
 */
module.exports = function simplestatic () {

  // ensure they passed a foldername to the --static flag
  let find = o => o === '-s' || o === '--static' || o === 'static'
  let index = process.argv.slice(0).findIndex(find)
  let folder = process.argv.slice(0)[index + 1]

  if (!folder)
    throw Error('static requires a folder argument')

  // create folders if they do not exist
  let app = join(process.cwd(), folder)
  if (!existsSync(app)) {
    mkdirSync(app, { recursive: true })
    mkdirSync(join(app, 'public'), { recursive: true })
  }

  // write app.arc
  writeFileSync(join(app, 'app.arc'), `@app
myapp

@static
# folder dist
`)

  // write public/index.html
  writeFileSync(join(app, 'public', 'index.html'), `<!doctype html>
<html>
<body>Hello world from public/index.html</body>
</html>
`)
}
