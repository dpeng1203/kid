// vue.config.js
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/user/' : './',
    publicPath: './',
    outputDir: 'kid',
    lintOnSave: false,
    devServer: {
        port: 8081, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                // target: 'http://localhost:9002/',
                target: 'http://wx.kidlingual.cn:8082/',
                // target: 'http://192.168.0.112:9002/mg',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                  }
            },
        },  // 配置多个代理
    },
    chainWebpack: (config) => {
        config.plugins.delete('prefetch')
    },
    productionSourceMap: false,
    // filenameHashing: false
}