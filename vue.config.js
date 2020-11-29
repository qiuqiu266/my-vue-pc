const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 配置路径别名
        "@views": path.resolve(__dirname, "src/views"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@comps": path.resolve(__dirname, "src/components"),
        "@store": path.resolve(__dirname, "src/store"),
        "@api": path.resolve(__dirname, "src/api"),
      },
    },
  },
  // 改了配置，一定要重启才能生效
  devServer: {
    proxy: {
      "/api": {
        target: "http://182.92.128.115",
        changeOrigin: true, // 允许跨域
        // pathRewrite: { // 重写路径
        //   "^/api": "",
        // },
      },
    },
  },
};
