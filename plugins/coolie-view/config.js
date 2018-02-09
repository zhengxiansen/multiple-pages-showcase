const path = require('path')

module.exports = {
  root: path.join(process.cwd(), './views'),
  defaultExtension: '.html',
  defaultViewEngine (options) {
    return options
  }
}
