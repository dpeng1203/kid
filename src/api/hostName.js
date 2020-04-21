// 配置开发环境与生产环境
let hostName;

if (process.env.NODE_ENV === "development") {
    // hostName = '/'; //测试
    hostName = '/api'
} else {
    hostName = 'http://wx.kidlingual.cn:8082/'
}

export default hostName