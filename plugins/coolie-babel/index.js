'use strict'

const fs = require('fs')
const path = require('path')
const babel = require('babel-core')

const pkg = require('./package.json')
const config = require('./config')

// todo: 为什么 babel-core 不会自己读 .babelrc 文件？？？？？
const babelrcPath = path.join(process.cwd(), '.babelrc')
if (fs.existsSync(babelrcPath) && fs.statSync(babelrcPath).isFile()) {
  Object.assign(config, JSON.parse(fs.readFileSync(babelrcPath)))
}

module.exports = function (options) {
  const babelOptions = Object.assign({}, config, options)

  function processJavaScript (options) {
    const { progress, file, code } = options

    // todo: 不支持 js 的处理？
    if (progress === 'pre-js') {
      // 使用 babel 转码
      const res = babel.transform(code, babelOptions)

      // 检查是否存在 sourceMap
      if (res.map) {
        // todo：这么获取当前文件的 dist 路径
        // const sourceMappingURL = `\n//# sourceMappingURL=${path.basename(file)}.map`
        // res.code = res.code + sourceMappingURL + '\n'
        // fs.write(path.basename(file) + '.map', JSON.stringify(res.map))
      }

      options.code = res.code
    }

    return options
  }

  processJavaScript.package = pkg

  return processJavaScript
}

// 返回中间件默认配置
module.exports.defaults = config
