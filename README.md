# 前端多页面开发案例

一个前端多页开发模板，开发环境使用 [browser-sync] 启用项目, 生产环境使用 [cooliejs] 作为构建打包工具,前端使用的是 [coolie.js] 作为模块加载器

## 功能介绍

 - 支持数据与模板分离
 - 支持**CommonJS**规范
 - 支持七牛静态资源上传

## 目录结构

```
Project
├── bs-config.js      // browser-sync 配置文件
├── coolie.config.js  // coolie-cli 配置文件
├── coolie-config.js  // coolie.js 配置文件
├── _data/            // 模板上下文数据 可选
├── _includes/        // 模板引用文件 可选
├── _layouts/         // 模板布局文件 可选
├── _middleware/       // 可选
│   ├── coolie-*.js   // coolie 中间件
│   └── bs-*.js       // browser-sync 中间件
├── _metadata/        // 模板上下文数据 可选
├── _plugins/         // 存放插件目录，可选
├── config/
├── dist/             // 用于存放构建好的资源，构建后生成
├── static/
│   ├── css/
│   ├── fonts/
│   ├── img/
│   ├── js/
│   └── res/
├── tests/
└── views/            // 视图模板
```

如上，由项目开发时约定的目录：

 * `_plugins` 用于编写构建用到的插件，可选。
 * `_middleware` 用于编写构建用到的中间件，可选。
 * `config` 用于编写配置文件
 * `static` 用于放置静态资源，可选。
 * `tests` 用于单元测试，可选。
 
由内置插件约定的目录:

  * `_data`，`_includes`，`_layouts` 用于放置模板编译需要的相关文件，具体参见内置插件 [nunjucks.js](./_plugins/nunjucks.js)
 
除了这些目录，还可以约定其他的，比如：
 * `views` 用于放置模板文件。
 * `scss` 用于放置 sass 文件。

## 开始使用

**1. 安装依赖**

```
npm install
```

**2. 启用项目**

```
npm run dev
```


**3. 项目发布**

```
npm run release
```

## Todo

 - [ ] 添加 esNext 语法支持
 - [ ] 添加代码检查功能
 - [ ] 添加对 `sass` 或 `less` 的支持
 - [ ] js 与 html 为同一目录，js 无法使用相对于当前 html 路径的问题
 
## 感谢

以下排名不分先后

 - 感谢 [bootstrap] 的提供的目录结构及静态资源
 - 感谢 [egg-view] 开源的代码，使我制作了 [bs-view.js](./_middleware/bs-view.js)
 - 感谢 [cooliejs] 提供的前端资源打包工具
 - 感谢 [coolie.js] 提供的前端模块加载工具
 
## 更新记录

 * [更新记录](./CHANGELOG.md)
 
## License

MIT

[browser-sync]: http://www.browsersync.cn/
[bootstrap]: https://github.com/twbs/bootstrap
[cooliejs]: https://coolie.ydr.me
[coolie.js]: https://github.com/cooliejs/coolie.js
[egg-view]:https://github.com/eggjs/egg-view
