const net = require('net')

let server = net.createServer(socket => {
    //新的连接
    socket.on('data',data=>{
        socket.write('hello')
    })

    socket.on('end',()=>{
        console.log('连接断开')
    })

    socket.write('welcome!')
})

server.listen(8124,()=>{
    console.log('server bound')
})