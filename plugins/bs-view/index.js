'use strict'

const fs = require('fs')
const url = require('url')
const path = require('path')
const assert = require('assert')

module.exports = function (options) {
  const viewDirs = [].concat(options.root || path.join(__dirname, '../..', 'views'))
  const viewExtension = options.defaultExtension || '.html'
  const viewEngine = options.defaultViewEngine || null
  const resolve = function (name) {
    const filename = resolvePath(name, viewDirs)
    assert(filename, `Can't find ${name} from ${viewDirs.join(',')}`)
    return filename
  }

  return function (req, res, next) {
    // 获取请求路径
    const reqPath = url.parse(req.url).pathname

    // 跳过非 HTML 内容
    const extName = path.extname(reqPath)
    if (![viewExtension, ''].includes(extName)) {
      return next()
    }

    // 生成相对路径
    const name = extName ? reqPath : path.join(reqPath, 'index' + viewExtension)

    // 获取文件名称
    const file = resolve(name)

    // 获取视图引擎
    assert(viewEngine, `Can't find viewEngine for ${file}`)

    // 渲染模板
    try {
      res.setHeader('Content-Type', 'text/html')
      res.write(viewEngine.render(file, {}, { file }))
      res.end()
    } catch (err) {
      // ignore error
      next(err)
    }
  }
}

/**
 * 从多个文件夹中获取文件名称
 *
 * @param { String } name     文件名称
 * @param { []<String> } root 视图根目录
 * @returns {*}
 */
function resolvePath (name, root) {
  for (const dir of root) {
    const filename = path.join(dir, name)
    if (fs.existsSync(filename)) {
      if (filename.indexOf(dir) > -1) {
        return filename
      }
    }
  }
}
