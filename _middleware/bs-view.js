'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const assert = require('assert');
const config = require('../config');

// 获取视图配置
const view = config.dev.view;
const viewDirs = Array.isArray(view.root) ? view.root : [ view.root ];
const viewExtension = view.defaultExtension || '.html';
const viewEngine = view.defaultViewEngine || null;

module.exports = function (req, res, next) {
  // 获取请求路径
  const reqPath = url.parse(req.url).pathname;

  // 跳过非 HTML 内容
  const extName = path.extname(reqPath);
  if (![ viewExtension, '' ].includes(extName)) {
    return next()
  }

  // 生成相对路径
  const name = extName ? reqPath : path.join(reqPath, 'index' + viewExtension);

  // 获取文件名称
  const filename = resolve(name);

  // 配置信息
  const options = {};
  options.name = name;
  options.root = filename.replace(path.normalize(name), '').replace(/[\/\\]$/, '');

  // 获取视图引擎
  assert(viewEngine, `Can't find viewEngine for ${filename}`);

  // 渲染模板
  try {
    res.setHeader('Content-Type', 'text/html');
    res.write(viewEngine.render(filename, {}, options));
    res.end();
  } catch (err) {
    // ignore error
    next(err)
  }
};

/**
 * 获取完整文件路径
 *
 * @param { String } name 文件名称
 * @returns { String }
 */
function resolve (name) {
  const filename = resolvePath(name, viewDirs);
  assert(filename, `Can't find ${name} from ${viewDirs.join(',')}`);
  return filename;
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
    const filename = path.join(dir, name);
    if (fs.existsSync(filename)) {
      if (filename.indexOf(dir) > -1) {
        return filename;
      }
    }
  }
}
