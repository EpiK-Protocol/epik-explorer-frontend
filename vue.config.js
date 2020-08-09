module.exports = {
  lintOnSave:false,
  devServer: {
    host: "0.0.0.0",
    port: "4396",
    proxy: {
  
      '/apis': {
        target: 'http://120.55.82.202/api/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/apis': '',
        },
      },
    },
  }
};
