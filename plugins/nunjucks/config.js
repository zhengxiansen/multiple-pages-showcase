'use strict'
const path = require('path')

module.exports = {
  dataPath: path.join(process.cwd(), './data'),
  searchPath: [path.join(process.cwd(), './views')],
  useCache: false,
  async: false,
  autoescape: false
}
