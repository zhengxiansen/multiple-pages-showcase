'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { FileSystemLoader, Environment } = require('nunjucks');

// 元数据文件夹
const DATA_DIR = path.join(__dirname, '..', '_data');

// 视图文件搜索路径
const searchPath = [
  path.join(__dirname, '..', '_layouts'),
  path.join(__dirname, '..', '_includes')
];

// 模板上下文数据加载
const context = {
  data ({ name }) {
    assert(name, 'name must be String');
    return {
      site: this._loadJSON(this.resolve('site')),
      page: this._loadJSON(this.resolve(name))
    }
  },
  resolve (name) {
    return path.join(DATA_DIR, path.dirname(name), path.basename(name, path.extname(name)) + '.json')
  },
  _loadJSON (filepath) {
    try {
      // todo: require 如何去缓存读取 JSON 文件
      return JSON.parse(fs.readFileSync(filepath));
    } catch (err) {
      // ignore error.
      console.log(`[nunjucks] load file: ${filepath}, error: ${err.message}`);
    }
  }
};

module.exports = function (root) {
  // 设置模板加载器
  const loader = new FileSystemLoader(searchPath.concat(root), {
    noCache: true
  });

  // 设置模板环境
  const env = new Environment(loader, {
    useCache: false,
    async: false,
    autoescape: false
  });

  return {
    render (filename, locals, options = {}) {
      return env.render(filename, context.data(options))
    },
    renderString (text, locals, options = {}) {
      return env.renderString(text, context.data(options))
    }
  }
};
