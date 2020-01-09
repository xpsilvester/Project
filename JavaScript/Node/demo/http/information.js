const http = require('http')

const options = {
    host: '127.0.0.1',
    port: 8080,
    path: '/length_request'
}

//发出请求
const req = http.request(options);
req.end()

req.on('information', (info) => {
    console.log(`获得主响应之前的信息：${info.statusCode}`)
})