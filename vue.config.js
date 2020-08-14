module.exports = {
  lintOnSave:false,
  devServer: {
    host: "0.0.0.0",
    port: "4396",
    proxy: {
  
      '/apis': {
        target: 'https://explorer.epik-protocol.io/api/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/apis': '',
        },
      },
    },
  }
};
