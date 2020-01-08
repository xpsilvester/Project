const {once,EventEmitter} = require('events');


async function run(){
    const ee = new EventEmitter();

    process.nextTick(() => {
        ee.emit('myevent',42)
    })

    const [value] = await once(ee,'myevent')

    console.log(value);

    const err = new Error('错误信息');

    process.nextTick(()=>{
        ee.emit('error',err)
    })

    try{
        await once(ee,'myevent')
    }catch(err){
        console.log('出错',err)
    }
}

run();