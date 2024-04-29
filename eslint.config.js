const arc = require('@architect/eslint-config')

module.exports = [
  ...arc,
  {
    ignores: [
      'node_modules/',
      'src/write-plugin/plugin.js',
    ],
  },
]
