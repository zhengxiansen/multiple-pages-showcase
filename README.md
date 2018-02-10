# 前端多页面开发案例

一个前端多页开发模板，开发环境使用 [browser-sync][browser-sync] 启用项目, 生产环境使用 [coolie-cli][coolie-cli] 作为构建打包工具,前端使用的是 [coolie.js] 作为模块加载器

## 功能介绍

 - 默认支持 [nunjucks][nunjucks] 模板引擎，可关闭
 - 支持 **CommonJS** 规范的文件
 - 支持 `proxyTable` 属性，详见 [http-proxy-middleware][http-proxy-middleware] 中间件文档
 - 支持七牛静态资源上传，详见 [7niu][7niu]
 - 支持阿里云 OSS，详见 [alioss][alioss]
 - 支持 [jest][jest] 测试框架
 - 支持端到端测试

## 目录结构

```text
Project
├── 7niu.json         // 七牛上传插件配置文件
├── alioss.json       // 阿里云上传插件配置文件
├── coolie-config.js  // 前端模块加载器配置文件
├── coolie.config.js  // coolie-cli 配置文件
├── bs.config.js      // browser-sync 配置文件
├── plugins/          // 项目构建所需的插件
├── config/           // 项目配置目录
├── data/             // 视图上下文数据 可选
├── includes/         // 视图碎片文件 可选
├── layouts/          // 视图布局文件 可选
├── views/            // 视图模板文件
├── test/             // 单元测试
└── static/
    ├── brand/        // 不同尺寸的 logo 
    ├── css/          
    ├── fonts/
    ├── img/
    ├── js/
    └── res/           
```

如上，由项目开发时约定的目录：

 * `config` 用于编写配置文件
 * `views` 用于放置视图模板文件。
 * `static` 用于放置静态资源，可选。
 * `tests` 用于单元测试，可选。
 
由插件约定的目录：

  * `data`，`includes`，`layouts` 用于放置模板编译需要的相关文件，具体参见内置插件 [nunjucks.js](./plugins/nunjucks/index.js)
 
除了这些目录，还可以约定其他的，比如：

 * `sass` 用于放置 scss 或 sass 文件。
 * `plugins` 项目构建所需的插件

## 开始使用

**1. 安装依赖**

```bash
npm install
```

**2. 启用项目**

```bash
npm run dev
```

**3. 项目构建**

```bash
npm run build
```

**4. 静态资源上传到 CDN**

注：需要在构建前配置 config/index.js 的 `build.assetsPublicPath` 为公共 cdn 的路径才可以

```bash
// 上传到七牛
npm run 7niu

// 上传到阿里云 oss
npm run alioss
```

**5. 项目发布**

```bash
npm run release
```

**6. 运行单元测试**

```bash
npm run unit
```

**6. 运行端到端测试**

```bash
npm run e2e
```

## Todo

 - [ ] 添加 es6 语法支持
 - [ ] 添加代码检查功能
 
## 感谢

以下排名不分先后

 - [bootstrap][bootstrap]
 - [browser-sync][browser-sync]
 - [coolie-cli][coolie-cli]
 - [coolie.js][coolie.js]
 - [egg-view][egg-view]
 - [http-proxy-middleware][http-proxy-middleware]
 - [nunjucks][nunjucks]
 - [jest][jest]
 
## 特别感谢

 - [@cloudcome][cloudcome]
 
## License

MIT

[browser-sync]: http://www.browsersync.cn/
[bootstrap]: https://github.com/twbs/bootstrap
[coolie-cli]: https://coolie.ydr.me
[coolie.js]: https://github.com/cooliejs/coolie.js
[egg-view]: https://github.com/eggjs/egg-view
[nunjucks]: https://github.com/mozilla/nunjucks
[jest]: https://facebook.github.io/jest/zh-Hans/
[http-proxy-middleware]: https://github.com/chimurai/http-proxy-middleware
[alioss]: https://www.npmjs.com/package/alioss
[7niu]: https://www.npmjs.com/package/7niu
[cloudcome]: https://ydr.me/
