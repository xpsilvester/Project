const {
  User
} = require('./model')
const {
  encode,
  decode
} = require('../crypto')

//通过openId查找用户
const getByOpenId = async (openId) => {
  const users = await User.find({
    openId: openId
  })
  //没有查到的话返回null
  if (users) {
    return users[0]
  }
  return null
}

module.exports = {
  //登录
  async login(openId) {
    let user = await getByOpenId(openId) //根据openId查用户
    if (!user) {  //如果用户不存在则创建用户
      user = await User.create({
        openId: openId
      })
    }
    console.log(user)
    const id = user._id
    const sessionKey = encode(id) //根据用户ID 生成登录凭证
    await User.update({   //更新最后登录时间
      _id: id
    }, {
      lastLogin: Date.now()
    })
    return {    //返回置录凭证
      sessionKey
    }
  },
  //根据sessionKey查找用户
  async findBySessionKey(sessionKey) {
    const {
      id,
      timespan
    } = decode(sessionKey)   //解密凭证，得到用户ID 和时间戳
    // sessionKey expire 3d
    if (Date.now() - timespan > 1000 * 60 * 60 * 24 * 3) {  //默认超时时间为3 天
      return null  //凭证超时，返回“空”
    }
    const users = await User.find({   //根据用户ID 查询用户
      _id: id
    })
    if (users.length) {  //如果查询到用户，则返回用户
      return users[0]
    }
    return null
  },
  //更新用户数据
  async update(id, data) {
    return User.update({
      _id: id
    }, data)
  },
  //更新用户类型
  async updateUserType(id, type) {
    return User.update({
      _id: id
    }, {
      userType: type
    })
  },
  //获取管理员列表
  async getAdmins() {
    return User.find({
      userType: 1
    })
  },
  //判断用户是否是管理员
  async isAdmin(id) {
    const user = await User.findById(id)
    return user.userType === 1
  },
  //判断用户是否被锁
  async isLocked(id) {
    const user = await User.findById(id)
    return user.userType === -1
  },
  //获取相应类型、页面的用户列表
  async getUsersByType(type, pageIndex, pageSize) {
    return User.find({
      userType: type
    }).skip((pageIndex - 1) * pageSize).limit(pageSize)
  },
  //获取相应类型的用户数量
  async getUsersCountByType(type) {
    return User.count({
      userType: type
    })
  },
  //获取相应页面的用户列表
  async getUsers(pageIndex, pageSize) {
    return User.find().skip((pageIndex - 1) * pageSize).limit(pageSize)
  },
  //获取所有用户数量
  async getUsersCount() {
    return User.count()
  }
}