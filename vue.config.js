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
      '/em-ep/': {
        target: 'http://47.118.50.171:11004',
        ws: false,
        pathRewrite: {
          '^/em-ep/': '/'
        }
      },
      "/": {
        target: "http://47.118.50.171:11003",
      },

    }
  }
}
