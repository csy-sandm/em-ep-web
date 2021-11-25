/*
 * @Description:
 * @Author: John Holl
 * @Github: https://github.com/hzylyh
 * @Date: 2021-02-06 15:14:44
 * @LastEditors: John Holl
 */

const path = require('path');
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  publicPath: './', // vueConf.baseUrl, // 根域上下文目录

  // assetsDir: 'static',
  // 选项...
  devServer: {
    proxy: {
      '/emApi/': {
        target: 'http://47.118.50.171:9003',
         //target: 'http://127.0.0.1:9003',
        ws: false,
        pathRewrite: {
          '^/emApi/': '/'
        }
      }
    }
  
  },
  configureWebpack: {

      resolve:{
        alias:{
          '@':path.resolve(__dirname, './src'),
          '@i':path.resolve(__dirname, './src/assets'),
        } 
      },
      plugins: [
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        
        // 配置compression-webpack-plugin压缩
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        }),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 5, 
          minChunkSize: 100
        })
      ],
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'element-ui': 'ELEMENT',
      echarts: 'echarts'
    }
  }

}
