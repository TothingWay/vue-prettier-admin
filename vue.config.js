const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 项目部署的基础路径
  publicPath: process.env.NODE_ENV === 'production' ? '/admin' : '/',

  // 生产环境构建文件名
  outputDir: 'admin',

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 调整内部的 webpack 配置。
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
        data: `@import "@/style/variables.scss"; @import "@/style/sidebar.scss"; @import "@/style/element-ui.scss"; @import "@/style/transition.scss"; @import "@/style/index.scss";`
      }
    }
  }
}
