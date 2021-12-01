const path = require('path')
module.exports = {
  lintOnSave: true,

  // 打包后可以部署到任意目录
  // publicPath: './',
  devServer: {
    open: true
  },

  pluginOptions: {
    // 记得重启服务器
    'style-resources-loader': {
      // 自动注入less文件到页面的style中
      preProcessor: 'less',
      // 配置哪些文件需要自动导入
      patterns: [
        path.join(__dirname, '/src/styles/variables.less')
      ]
    }
  }
}
