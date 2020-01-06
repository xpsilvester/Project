//以下是一个使用消息系统的示例。 
//它在主进程中对工作进程接收的 HTTP 请求数量保持计数：
const cluster = require('cluster')
const http = require('http')

if(cluster.isMaster){

    //跟踪 http 请求
    let numReqs = 0;
    setInterval(()=>{
        console.log(`请求的数量 = ${numReqs}`)
    },1000)

    //对请求计数
    function messageHandler(msg){
        if(msg.cmd && msg.cmd === 'notifyRequest'){
            numReqs += 1
        }
    }

    // 启动worker 并监听包含 notifyRequest 的消息
    const numCPUs = require('os').cpus().length
    for(let i=0;i<numCPUs;i++){
        cluster.fork()
    }

    for(const id in cluster.workers){
        cluster.workers[id].on('message',messageHandler)
    }
}else{
    //工作进程有一个http服务器
    http.createServer((req,res) => {
        res.writeHead(200);
        res.end('Hello World!\n')

        //通知主进程接收到了请求。
        process.send({cmd: 'notifyRequest'})
    }).listen(8100)
}
