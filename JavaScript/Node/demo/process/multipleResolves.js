const process = require('process')

process.on('multipleResolves',(type,promise,reason) => {
    console.error(type,promise,reason);
    setImmediate(() => process.exit(1))
})

async function main(){
    try{
        return await new Promise((resolve,reject)=>{
            resolve('第一次调用');
            resolve('吞没解决');
            reject(new Error('吞没解决'))
        })
    } catch {
        throw new Error('失败')
    }
}

main().then(console.log)