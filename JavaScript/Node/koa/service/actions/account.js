const {
  login,
  update,
  updateUserType,
  getUsersByType,
  getUsersCountByType,
  getUsers,
  getUsersCount
} = require('../lib/db/user')
const {
  add, updateSessionKey, getSessionKey, removeData
} = require('../lib/db/code')
const {
  getSession
} = require('../lib/wx')
const {
  encodeErCode,
  decode
} = require('../lib/crypto')

module.exports = {
  //用户登录
  async login(code) {
    const session = await getSession(code)
    if (session) {  //如果未从微信接口获取到数据，则登录失败
      const {
        openid
      } = session
      return login(openid)   //如果微信接口返回数据，则通过openid进行登录
    } else {
      throw new Error('登陆失败')
    }
  },
  //更新用户数据
  async update(id, data) {
    return update(id, data)
  },
  //设置用户类型
  async setUserType(id, userType) {
    return updateUserType(id, userType)
  },
  //根据用户类型获取用户列表
  async getUsersByType(type, pageIndex, pageSize) {
    let userType, count, users
    switch (type) {
      case 'admin':
        userType = 1
        break
      case 'blocked':
        userType = -1
        break
      case 'ordinary':
        userType = 0
        break
    }
    if (userType !== undefined) {
      [count, users] = await Promise.all([getUsersCountByType(userType), getUsersByType(userType, pageIndex, pageSize)])
    } else {
      [count, users] = await Promise.all([getUsersCount(), getUsers(pageIndex, pageSize)])
    }
    return {
      count,
      data: users
    }
  },
  //获取二维码
  async getErCode() {
    const code = encodeErCode()    //生成二维码信息
    await add(code)   //将二维码信息存储到数据库中
    setTimeout(() => {   //定时清除二维码信息
      removeData(code)
    }, 30000)  //默认时间为30s 
    return code  //返回code
  },
  //更新二维码凭证
  async setSessionKeyForCode(code, sessionKey) {
    const { timespan } = decode(code)  //将二维码解密出来，得到二维码的时间戳
    // 30s 过期
    if (Date.now() - timespan > 30000) {  //检查二维码是否己过期
      throw new Error('time out')   //如果过期，则设置为失败
    }
    await updateSessionKey(code, sessionKey) //更新二维码信息中的登录凭证
  },
  //获取code凭证
  async getSessionKeyByCode(code) {
    const sessionKey = await getSessionKey(code)   //根据code 从数据库中查询凭证
    if (sessionKey) {  //查询到登录凭证后
      await removeData(code)  //在数据库中清除当前数据
    }
    return sessionKey
  }
}