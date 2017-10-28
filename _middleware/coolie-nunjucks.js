'use strict';

const path = require('path');
const config = require('../config');

// 获取视图配置
const view = config.dev.view;
const viewDirs = Array.isArray(view.root) ? view.root : [ view.root ];
const viewEngine = view.defaultViewEngine || null;

/**
 * 文件逆运算
 *
 * @param { String } filename 文件名称
 * @returns {{root, name}}
 */
function relativeToObject (filename) {
  for (const dir of viewDirs) {
    if (filename.indexOf(dir) > -1) {
      return { root: dir, name: path.relative(dir, filename) };
    }
  }
}

module.exports = function (options) {
  if (options.progress === 'pre-html') {
    // 渲染HTML模板
    options.code = viewEngine.renderString(options.code, null, relativeToObject(options.file));
  }

  return options
};
