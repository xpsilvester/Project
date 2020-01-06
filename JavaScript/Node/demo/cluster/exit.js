//
const cluster = require('cluster')
const http = require('http')

if(cluster.isMaster){//如果该进程是主进程，则为 true
    const worker = cluster.fork();

    worker.on('exit',(code,signal) => {
        if(signal){
            console.log(`工作进程已被信号 ${signal} 杀死`)
        }else if(code !== 0){
            console.log(`工作进程退出，退出码：${code}`)
        }else{
            console.log('工作进程成功退出')
        }
    })
}else{
    http.createServer((req,res) => {
        res.writeHead(200);
        res.end('Hello World!\n')
    }).listen(8100)

    console.log(`工作进程 ${process.pid} 已启动`)
}
