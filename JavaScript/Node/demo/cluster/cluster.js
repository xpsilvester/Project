//单个 Node.js 实例运行在单个线程中。 
//为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。
//cluster 模块可以创建共享服务器端口的子进程。

const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if(cluster.isMaster){//如果该进程是主进程，则为 true

    console.log(`主进程 ${process.pid} 正在运行`)

    //衍生工作进程
    for(let i=0;i<numCPUs;i++){
        cluster.fork();//衍生出一个新的工作进程,这只能通过主进程调用。
    }

    cluster.on('exit',(worker,code,signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`)
    })
}else{
    // 工作进程可以共享任何TCP连接。
    // 在本例子中，共享的是HTTP服务器。
    http.createServer((req,res) => {
        res.writeHead(200);
        res.end('Hello World!\n')
    }).listen(8100)

    console.log(`工作进程 ${process.pid} 已启动`)
}

// 主进程 17320 正在运行
// 工作进程 1804 已启动
// 工作进程 1292 已启动
// 工作进程 16160 已启动
// 工作进程 10820 已启动

