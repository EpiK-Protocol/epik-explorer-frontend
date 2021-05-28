module.exports = {
  lintOnSave:false,
  devServer: {
    // host: "0.0.0.0",
    port: "4396",
    proxy: {
  
      '/apis': {
        // target: 'https://explorer.epik-protocol.io/api/',
        target:'http://116.63.146.223:3002/',
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
