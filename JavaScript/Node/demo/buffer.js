const buf = Buffer.from('test','ascii')

console.log(buf.toString('hex')) //74657374

console.log(buf.toString('base64')) //dGVzdA==

console.log(buf.toString('ascii')) //test

// 创建一个长度为 20、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(20)

// 创建一个长度为 20、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(20,1)

// 创建一个长度为 20、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(20)

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1,2,3])

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést')

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

//写入 Node 缓冲区 buf.write(string[, offset[, length]][, encoding])
const buf7 = Buffer.alloc(256)
let len = buf7.write('www.xpsilveter.com')

console.log('写入字节数：'+len) //写入字节数：18

//从缓冲区读取数据 buf.toString([encoding[, start[, end]]])
const buf8 = Buffer.alloc(26)
for(let i=0;i<26;i++){
    buf8[i] = i + 97;
}

console.log(buf8.toString('ascii')) // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf8.toString('ascii',0,5)) //使用 'ascii' 编码, 并输出: abcde
console.log(buf8.toString('utf8',0,5)) // 使用 'utf8' 编码, 并输出: abcde
console.log(buf8.toString(undefined,0,5)) // 使用默认的 'utf8' 编码, 并输出: abcde

//将 Buffer 转换为 JSON 对象 buf.toJSON()
const buf9 = Buffer.from([0x1,0x2,0x3,0x4,0x5])
const json = JSON.stringify(buf9)

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json)

const copy = JSON.parse(json,(key,value)=>{
    return value && value.type === 'Buffer' ?
        Buffer.from(value.data) :
        value;
})

// 输出: <Buffer 01 02 03 04 05>
console.log(copy)

//缓冲区合并 Buffer.concat(list[, totalLength])
let buffer1 = Buffer.from('测试例子,'),
    buffer2 = Buffer.from('www.xpsilvester.com'),
    buffer3 = Buffer.concat([buffer1,buffer2]);
//buffer3 内容：测试例子,www.xpsilvester.com
console.log('buffer3 内容：' + buffer3.toString())

//缓冲区比较 buf.compare(otherBuffer)
let buffer4 = Buffer.from('ABC'),
    buffer5 = Buffer.from('ABCD'),
    result = buffer4.compare(buffer5);

//ABC 在 ABCD之前
if(result < 0){
    console.log(buffer4 + " 在 " + buffer5 + "之前")
}else if(result == 0){
    console.log(buffer4 + " 与 " + buffer5 + "相同")
}else{
    console.log(buffer4 + " 在 " + buffer5 + "之后")
}

//拷贝缓冲区 buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
let buffer6 = Buffer.from('abcdefghijkl'),
    buffer7 = Buffer.from('RUNOOB');

//将 buffer7 插入到 buffer6 指定位置上
buffer7.copy(buffer6,2)

console.log(buffer6.toString())//abRUNOOBijkl

//缓冲区裁剪 buf.slice([start[, end]])
let buffer8 = Buffer.from('xpsilvester'),
    buffer9 = buffer8.slice(0,2)

console.log('buffer9 content: ' + buffer9.toString())//buffer9 content: xp

