'use strict';

const path = require('path');
const nunjucks = require('../_plugins/nunjucks');

function resolve (_path) {
  return path.join(__dirname, '..', _path)
}

module.exports = {
  build: {
    // todo: env 期望能在js中使用
    // 初步的想法是将数据传入 nunjucks 模板上下文环境
    // 使用 Script 动态生成js变量
    // 这样 HTML 模板及 js 中都能使用
    // 假如 coolie 能原生支持，那就直接用 coolie
    env: require('./prod.env'),
    assetsRoot: './dist',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: "local",
    view: {
      root: resolve('views'), // array | string
      defaultExtension: '.html',
      defaultViewEngine: nunjucks(resolve('views'))
      // todo: 后续支持跟多的参数
    },
    static: {
      dir: [ resolve('.') ], // array | string
      // todo: 后续支持跟多的参数
    },
    // todo: 待实现初步的想法是使用 bowserSync 的代理机制动态生成
    proxyTable: {}
  }
};
