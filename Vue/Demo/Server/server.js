const ws = require('nodejs-websocket');

const moment = require('moment');

console.log('开始建立连接...')

let users = [];

//向所有连接的客户端广播
function boardcast(obj){
    server.connections.forEach(conn => {
        conn.sendText(JSON.stringify(obj))
    });
}

function getDate(){
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

let server = ws.createServer(conn => {
    conn.on('text',obj => {
        obj = JSON.parse(obj)
        if(obj.type === 1){
            users.push({
                nickname: obj.nickname,
                uid: obj.uid
            })
            boardcast({
                type: 1,
                date: getDate(),
                msg: obj.nickname + 'add Chat',
                users: users,
                uid: obj.uid,
                nickname: obj.nickname
            })
            console.log({
                type: 1,
                date: getDate(),
                msg: obj.nickname + 'add Chat',
                users: users,
                uid: obj.uid,
                nickname: obj.nickname
            })
        } else {
            boardcast({
                type: 2,
                date: getDate(),
                msg: obj.msg,
                uid: obj.uid,
                nickname: obj.nickname
            })
            console.log({
                type: 2,
                date: getDate(),
                msg: obj.msg,
                uid: obj.uid,
                nickname: obj.nickname
            })
        }
    })
    conn.on('close',function(code,reason){
        console.log('关闭连接')
    })
    conn.on('error',function(code,reason){
        console.log('异常关闭')
    })
}).listen(8001)

console.log('WebSocket建立完毕')