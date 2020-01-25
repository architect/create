let mkdir = require('mkdirp').sync
let exists = require('fs').existsSync
let write = require('fs').writeFileSync
let join = require('path').join

/**
 * create a very minimal static app
 *
 * usage
 *
 * arc init --static ./foo
 */
module.exports = function simplestatic() {

  // ensure they passed a foldername to the --static flag
  let find = o=> o === '-s' || o === '--static' || o === 'static'
  let index = process.argv.slice(0).findIndex(find)
  let folder = process.argv.slice(0)[index + 1]

  if (!folder)
    throw Error('static requires a folder argument')

  // create folders if they do not exist
  let app = join(process.cwd(), folder)
  if (!exists(app)) {
    mkdir(app)
    mkdir(join(app, 'public'))
  }

  // write .arc
  write(join(app, '.arc'), `@app
myapp

@static
# folder dist
`)

  // write public/index.html
  write(join(app, 'public', 'index.html'), `<!doctype html>
<html>
<body>Hello world from public/index.html</body>
</html>
`)
}
