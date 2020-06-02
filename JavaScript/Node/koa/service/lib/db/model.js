const mongoose = require('mongoose')

//添加账户的数据模型
const userSchema = new mongoose.Schema({
  openId: { //存储OpenID
    type: String,
    index: true, //需要按照OpenID查询用户，建立索引
    unique: true //OpenID唯一约束
  },
  created: {  //账户创建时间
    type: Date,
    default: Date.now
  },
  lastLogin: { //最近登录时间
    type: Date
  },
  name: { //用户名
    type: String,
    index: true
  },
  avatar: { //用户头像
    type: String
  },
  userType: { //用户类型，标记管理员、普通用户、禁用用户
    type: Number,
    default: 0
  }
})