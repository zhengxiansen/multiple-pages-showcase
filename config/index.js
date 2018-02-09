'use strict'

const path = require('path')
const nunjucks = require('../plugins/nunjucks')

const resolve = function (_path) {
  return path.join(__dirname, '..', _path)
}

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable: {},

    // Various Dev Server settings
    host: process.env.HOST || 'localhost', // can be overwritten by process.env.HOST
    port: process.env.PORT || 8080, // can be overwritten by process.env.PORT
    // http://www.browsersync.cn/docs/options/#option-open
    autoOpenBrowser: false,

    // 不想使用模板的时候可以设置为 false 或 直接移除
    view: {
      root: resolve('views'),
      // https://mozilla.github.io/nunjucks/cn/api.html#configure
      defaultViewEngine: nunjucks({
        // 模板搜索路径
        searchPath: [
          resolve('layouts'),
          resolve('includes'),
          resolve('views')
        ]
      })
    }
  },
  build: {
    // Paths
    assetsRoot: './dist',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
  }
}
