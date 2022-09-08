let { join } = require('path')
let { existsSync, readFileSync } = require('fs')
let { spawn } = require('child_process')

/**
 * Install @architect/architect into a fresh new project
 */
module.exports = function installArc ({ folder, update }, callback) {
  let cwd = folder
  let canceled = false

  let pkgFile = join(cwd, 'package.json')
  if (existsSync(pkgFile)) {
    let pkg = JSON.parse(readFileSync(pkgFile))
    let arc = '@architect/architect'
    if (pkg?.dependencies?.[arc] || pkg?.devDependencies?.[arc]) return callback()
  }

  update.start('Installing Architect...')

  let child = spawn('npm', [ 'i', '@architect/architect', '--save-dev' ], { cwd, shell: true })
  child.stdout.on('data', data => {
    if (!canceled) {
      update.status('Installing Architect...')
    }
    update.cancel()
    canceled = true
    process.stdout.write(data.toString())
  })
  child.stderr.on('data', data => {
    process.stdout.write(data.toString())
  })
  child.on('close', code => {
    if (code === 0) {
      console.log() // Space
      update.done('Your Architect project is ready! Get started with: npx arc sandbox')
      callback()
    }
    else {
      callback(Error('Architect installation failed'))
    }
  })
}
