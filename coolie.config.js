/**
 * ======================================================
 * coolie-cli 配置文件 `coolie.config.js`
 * 使用 `coolie init -c` 生成 `coolie.config.js` 文件模板
 * 当前配置文件所在的目录为构建的根目录
 *
 * @link https://coolie.ydr.me/guide/coolie.config.js/
 * @author ydr.me
 * @version 2.2.4
 * @create 2017-10-27 13:31:52
 * =======================================================
 */

'use strict'

const path = require('path')
const config = require('./config')
const coolieView = require('./plugins/coolie-view')
const coolieBabel = require('./plugins/coolie-babel')

module.exports = function (coolie) {
  // coolie 配置
  coolie.config({
    // 目标配置
    dest: {
      // 目标目录，相对于当前文件
      dirname: config.build.assetsRoot,
      // 目标根域
      host: config.build.assetsPublicPath,
      // 版本号长度
      versionLength: 32
    },

    // 是否在构建之前清空目标目录
    clean: true,

    // html 构建
    html: {
      // html 文件，相对于当前文件
      src: 'views/**/*.html',
      // html 压缩配置
      minify: true
    },

    // js 构建
    js: {
      // 入口模块，相对于当前文件
      main: 'views/**/*.js',
      // coolie-config.js 路径，相对于当前文件
      'coolie-config.js': './coolie-config.js',
      // js 文件保存目录，相对于 dest.dirname
      dest: path.join(config.build.assetsSubDirectory, 'js/'),
      // 分块配置
      chunk: [],
      // js 压缩配置
      minify: {
        global_defs: {
          DEBUG: false
        }
      }
    },

    // css 构建
    css: {
      // css 文件保存目录，相对于 dest.dirname
      dest: path.join(config.build.assetsSubDirectory, 'css/'),
      // css 压缩配置
      minify: true
    },

    // 资源
    resource: {
      // 资源保存目录，相对于 dest.dirname
      dest: path.join(config.build.assetsSubDirectory, 'res/'),
      // 是否压缩
      minify: true
    },

    // 原样复制文件，相对于当前文件
    copy: [
      './favicon.ico',
      './robots.txt'
    ]
  })

  // 添加 babel 中间件
  coolie.use(coolieBabel())

  // 使用模板编译 HTML
  if (config.dev.view) coolie.use(coolieView(config.dev.view))
}
