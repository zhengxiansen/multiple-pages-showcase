'use strict'

const pkg = require('./package.json')
const config = require('./config')

module.exports = function (configs) {
  const options = Object.assign({}, config, configs)
  const viewEngine = options.defaultViewEngine || null

  function processMarked (options) {
    if (options.progress === 'pre-html') {
      options.code = viewEngine.renderString(options.code, null, {
        file: options.file
      })
    }

    return options
  }

  processMarked.package = pkg

  return processMarked
}

// 返回中间件默认配置
module.exports.defaults = config
