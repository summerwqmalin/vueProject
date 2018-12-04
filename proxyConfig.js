module.exports = {
  proxyList: {
    '/apis': {
      // 测试环境
      target: 'http://xxxxxxxx.com/xxxx', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/apis': '' //需要rewrite重写的,
      }
    }
  }
}