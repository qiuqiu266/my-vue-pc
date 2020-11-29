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
      // 请求是以api开头的
      "/api": {
        // 最终目标服务器
        target: "http://182.92.128.115",
        changeOrigin: true, // 允许跨域
        // 重写路径，将来可能会有不是/api开头，此时接口都是要api，所以不能重写
        // pathRewrite: {
        //   "^/api": "",
        // },
      },
    },
  },
};
