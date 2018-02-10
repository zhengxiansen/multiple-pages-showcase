/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')

const config = require('./config')

const viewOptions = config.dev.view
const views = viewOptions && viewOptions.root ? viewOptions.root : path.join(__dirname, './views')
const middlewares = []
const proxyTable = config.dev.proxyTable

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  middlewares.push(proxyMiddleware(context, options))
})

// 添加 view 中间件
if (viewOptions) {
  middlewares.push(require('./plugins/bs-view')(viewOptions))
}

module.exports = {
  // files: views,
  server: {
    baseDir: views
  },
  host: config.dev.host,
  port: config.dev.port,
  middleware: middlewares,
  serveStatic: [
    path.join(__dirname, '.')
  ],
  open: config.dev.autoOpenBrowser,
  browser: 'default',
  // todo: 插件如何阻止 bs 的 reload？
  // plugins: [
  //   {
  //     module: 'bs-html-injector',
  //     options: {
  //       files: views
  //     }
  //   }
  // ],
  reloadDebounce: 2000
}
