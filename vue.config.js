'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const externals = {
  vue: 'Vue',
  axios: 'axios',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'element-ui': 'ELEMENT'
}
const cdn = {
  css: [
    // normalize
    'https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css',
    // element-ui
    'https://cdn.jsdelivr.net/npm/element-ui@2.7.2/lib/theme-chalk/index.css'
  ],
  js: [
    // vue
    'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.runtime.min.js',
    // vue-router
    'https://cdn.jsdelivr.net/npm/vue-router@3.0.5/dist/vue-router.min.js',
    // vuex
    'https://cdn.jsdelivr.net/npm/vuex@3.1.0/dist/vuex.min.js',
    // axios
    'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
    // element-ui
    'https://cdn.jsdelivr.net/npm/element-ui@2.7.2/lib/index.js'
  ]
}

const name = defaultSettings.title || 'Vue Admin Template' // page title

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'production' ? '/backManage' : '/',
  outputDir: 'backManage',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/dailySentence': {
        target: 'https://api.hibai.cn/api/index/index',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/dailySentence': '/'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '~': resolve('src/views')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )

    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          // use CDN
          config.externals(externals)

          config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
          })

          // use GZip
          config
            .plugin('compression')
            .use(CompressionPlugin, {
              asset: '[path].gz[query]',
              algorithm: 'gzip',
              test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
              threshold: 10240,
              minRatio: 0.8,
              cache: true
            })
            .tap(args => { })

          // analyzer
          if (process.env.npm_config_report) {
            config
              .plugin('webpack-bundle-analyzer')
              .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          }
        }
      )
  }
}
