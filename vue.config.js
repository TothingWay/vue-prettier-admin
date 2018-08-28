const path = require('path')
// const fs = require('fs')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部
  baseUrl: process.env.NODE_ENV === 'production' ? '/admin' : '/',

  // 将构建好的文件输出到哪里
  outputDir: 'admin',

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set('~', resolve('src/views'))
      .set('utils', resolve('src/utils'))
      .set('icons', resolve('src/icons'))
      .set('store', resolve('src/store'))
      .set('assets', resolve('src/assets'))

    config.module.rule('svg')
      .exclude
      .add(resolve('src/icons'))

    config.module.rule('svgIcon')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },

  // CSS 相关选项
  css: {
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        data: `@import "@/style/index.scss";`
      }
    }
  }
}
