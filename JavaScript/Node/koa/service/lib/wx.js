
//获取存储在config 文件中的信息
const {appKey,appSecret,isTest} = require('../config')
//采用requ est 组件调用微信接口
const request = require('request')

module.exports = {
    //根据code 换取Open ID 等信息
    async getSession (code) {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appKey}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
        console.log(`getSession wx请求：${url}`)    //记录wx请求日志
        return new Promise((resolve, reject) => {
            if(isTest){
                resolve('wx1234567890')
            }else{
                request(url, {
                    method: 'GET',
                    json: true
                }, (error, res, body) => {
                    if (error) { //根据code 换取Open ID 等信息
                        reject(error)
                        } else {
                        if (body.errcode) { //处理微信接口返回的异常
                            reject(new Error(body.errmsg))
                        } else {
                            resolve(body)
                        }
                    }
                })
            }
        })
    }
}
  