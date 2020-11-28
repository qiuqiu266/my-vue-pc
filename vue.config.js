const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 配置路径别名
        "@views": path.resolve(__dirname, "src/visews"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@coms": path.resolve(__dirname, "src/components"),
        "@store": path.resolve(__dirname, "src/store"),
        "@api": path.resolve(__dirname, "src/api"),
      },
    },
  },
  // 改了配置，一定要重启才能生效
  // devServe: {
  //   proxy: {
  //     "/api": {
  //       targat: "http://182.02.128.115",
  //       changeOrigin: true, // 允许跨域
  //     },
  //   },
  // },
};
