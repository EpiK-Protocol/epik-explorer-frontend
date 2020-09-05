module.exports = {
  lintOnSave:false,
  devServer: {
    // host: "0.0.0.0",
    port: "4396",
    proxy: {
  
      '/apis': {
        target: 'https://explorer.epik-protocol.io/api/',
        // target:'http://120.55.82.202/api/',
        changeOrigin: true,
        secure:false,
        // ws: true,
        pathRewrite: {
          '^/apis': '',
        },
      },
    },
  }
};
