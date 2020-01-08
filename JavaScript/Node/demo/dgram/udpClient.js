const dgram = require('dgram');

let message = Buffer.from('测试 Node.js');

let client = dgram.createSocket('udp4');

client.send(message,0,message.length,41234,'localhost',(err,bytes)=>{
    client.close();
})