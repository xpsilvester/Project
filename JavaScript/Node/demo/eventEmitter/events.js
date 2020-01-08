const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
let id = 0;

myEmitter.on('event',function(...args){
    console.log(`触发事件 ${++id}：`)
    console.log(...args,this,this === myEmitter)
})

myEmitter.once('onceEvent',()=>{
    console.log('一次性事件')
})

myEmitter.on('error', (err) => {
    console.error(`错误信息${err}`);
});

myEmitter.emit('event');
myEmitter.emit('event','a','b');
myEmitter.emit('onceEvent');
myEmitter.emit('onceEvent');
myEmitter.emit('error', new Error('自触发错误'));

