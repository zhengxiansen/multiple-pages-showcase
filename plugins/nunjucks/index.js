'use strict'

const fs = require('fs')
const path = require('path')

const { FileSystemLoader, Environment } = require('nunjucks')

const defaultConfig = require('./config')

module.exports = function (searchPath, options = {}) {
  if (searchPath !== null && typeof searchPath === 'object') {
    options = searchPath
    searchPath = null
  }

  options = Object.assign({}, defaultConfig, options)
  searchPath = Array.isArray(searchPath) ? searchPath : [].concat(searchPath || options.searchPath)

  // 数据文件夹
  const { dataPath } = options

  // 上下文数据加载
  const context = {
    // 加载模板上下文数据
    load (file) {
      return {
        site: this.loadFile(path.join(dataPath, 'site.json')),
        page: this.loadFile(path.join(
          dataPath,
          path.dirname(this.relativeToPath(path.normalize(file))),
          path.basename(file, path.extname(file)) + '.json'
        ))
      }
    },
    relativeToPath (filename) {
      for (const dir of searchPath) {
        if (filename.indexOf(dir) > -1) {
          return path.relative(dir, filename)
        }
      }
    },
    loadFile (filepath) {
      // 不缓存 json 文件数据
      return fs.existsSync(filepath) ? JSON.parse(fs.readFileSync(filepath)) : null
    }
  }

  // 设置模板加载器
  const loader = new FileSystemLoader(searchPath, {
    noCache: true
  })

  // 初始化模板环境
  const env = new Environment(loader, Object.assign({}, exports.defaults, options))

  return {
    env,
    render (filename, locals, options = {}) {
      return env.render(filename, context.load(options.file))
    },
    renderString (text, locals, options = {}) {
      return env.renderString(text, context.load(options.file))
    }
  }
}

// 导出默认配置
module.exports.defaults = defaultConfig
