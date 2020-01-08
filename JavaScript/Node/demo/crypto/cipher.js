const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';

// 密钥长度取决于算法。
// 在此示例中，对于 aes192，它是 24 个字节（192 位）。
// 改为使用异步的 `crypto.scrypt()`。
const key = crypto.scryptSync(password,'盐值',24);
// 使用 `crypto.randomBytes()` 生成随机的 iv 而不是此处显示的静态的 iv。
const iv = Buffer.alloc(16,0); //初始化向量

const cipher = crypto.createCipheriv(algorithm,key,iv);

let encrypted = '';
cipher.on('readable',()=>{
    let chunk;
    while(null !== (chunk = cipher.read())){
        encrypted += chunk.toString('hex')
    }
})
cipher.on('end',()=>{
    console.log(encrypted);//9d47959b80d428936beef61216ef0b7653b5d23a670e082bd739f6cebcb6038f
})

cipher.write('要加密的数据');
cipher.end()