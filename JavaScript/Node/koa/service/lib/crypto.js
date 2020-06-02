const crypto = require('crypto')
const secret = 'xp_2020_06'  //加密密钥
const algorithm = 'aes-256-cbc'  //加密算法

function encode (id) { //加密
  const encoder = crypto.createCipher(algorithm, secret)  //创建加密器
  const str = [id, Date.now(), 'xp2018'].join('|')  //构建加密字符串
  let encrypted = encoder.update(str, 'utf8', 'hex')
  encrypted += encoder.final('hex')
  return encrypted
}

function decode (str) {  //解密算法
  const decoder = crypto.createDecipher(algorithm, secret)  //创建解密器
  let decoded = decoder.update(str, 'hex', 'utf8') 
  decoded += decoder.final('utf8')
  const arr = decoded.split('|')  //将解密后的字符串按照自定义规则解密郎才象
  return {
    id: arr[0],
    timespan: parseInt(arr[1])
  }
}

function encodeErCode () {
  return encode(Math.random())
}

module.exports = {
  encode,
  decode,
  encodeErCode
}