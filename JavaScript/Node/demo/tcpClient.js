const net = require('net')

let client = net.connect({port:8124},()=>{
    console.log('client connected');
    client.write('world!')
})

client.on('data',data=>{
    console.log(data.toString())
    client.end()
})

client.on('end',()=>{
    console.log('client disconnected')
})