const cluster = require('cluster')

if(cluster.isMaster){
    const worker = cluster.fork()
    let timeout;

    worker.on('listening', (address) => {
        worker.send('shutdown')
        worker.disconnect()
        timeout = setTimeout(() => {
            worker.kill()
        },2000)
    })

    worker.on('disconnect',() => {
        clearTimeout(timeout)
    })
} else if (cluster.isWorker){
    const net = require('net')
    const server = net.createServer((socket) => {
        //连接永远不会结束
    })

    server.listen(8100)

    process.on('message', (msg) => {
        if(msg === 'shutdown'){
            //将所有与服务器的连接优雅地关闭
        }
    })
}