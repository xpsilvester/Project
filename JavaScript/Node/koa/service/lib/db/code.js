const {
  Code
} = require('./model')

module.exports = {
  async add (code) {  //添加二维码
    return Code.create({
      code: code
    })
  },
  async updateSessionKey (code, sessionKey) {
    return Code.update({
      code: code
    }, {
      sessionKey: sessionKey
    })
  },
  async getSessionKey (code) {
    const data = await Code.findOne({   //根据code 查询记录
      code: code
    }) 
    if (data) {   //获取到数据
      return data.sessionKey   //返回登录凭证
    } else {
      return null
    }
  },
  async removeData (code) {  //删除二维码信息
    return Code.deleteMany({
      code: code
    })
  }
}