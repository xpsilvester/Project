let fs = require('fs');

// 异步打开文件
console.group('准备打开文件！')
fs.open('input.txt','r+',(err,fd) => {
    if(err){
        return console.error(err)
    }
    console.log('文件打开成功！')
})


//异步读取
fs.readFile('input.txt', (err,data) => {
    if(err){
        return console.error(err)
    }
    console.log('异步读取：' + data.toString())
})

//同步读取
let data = fs.readFileSync('input.txt');
console.log('同步读取：'+ data.toString())

fs.stat('input.txt',(err,stats) => {
    if(err){
        return console.log(err)
    }
    console.log(stats);
    console.log('读取文件信息成功！');

    //检测文件类型
    console.log('是否为文件(isFile) ? ' + stats.isFile())
    console.log('是否为目录(isDirectory) ? ' + stats.isDirectory())
})

