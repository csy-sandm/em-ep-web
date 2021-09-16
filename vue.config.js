/*
 * @Description:
 * @Author: John Holl
 * @Github: https://github.com/hzylyh
 * @Date: 2021-02-06 15:14:44
 * @LastEditors: John Holl
 */

module.exports = {
  lintOnSave: false,
  publicPath: './', // vueConf.baseUrl, // 根域上下文目录

  // assetsDir: 'static',
  // 选项...
  devServer: {
    proxy: {
      '/emApi/': {
        target: 'http://47.118.50.171:9003',
        ws: false,
        pathRewrite: {
          '^/emApi/': '/'
        }
      }
    }
    // proxy: {
    //   '/emApi/em-ep/': {
    //    // target: 'http://47.118.50.171:11004',
    //    target: 'http://127.0.0.1:11004',
    //     ws: false,
    //     pathRewrite: {
    //       '^/emApi/em-ep/': '/'
    //     }
    //   },
    //   "/emApi/v1/": {
    //     //target: "http://47.118.50.171:11003/",
    //     target: "http://127.0.0.1:11003/",
    //     ws: false,
    //     pathRewrite: {
    //       '^/emApi/': '/'
    //     }
    //   },
    // }

  }
}
