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
  userType: { //用户类型，标记管理员1、普通用户0、禁用用户-1
    type: Number,
    default: 0
  }
})

//二维码信息模型
const codeSchema = new mongoose.Schema({
  code: {  //存储二维码字符串
    type: String
  },
  sessionKey: String //存储小程序的登录凭证
})

// 建立相册数据模型
// 可以在第3 个参
// 数中快捷地创建“ created.At”和“ updated.At”字段，在插入和更新数据时，
// 将自动更新这些字段。
const albumSchema = new mongoose.Schema({
  userId: { //根据此字段关联相册的拥有者
    type: String
  },
  name: {  //相册名称
    type: String
  }
}, {  //对数据模型的描述 (第三个参数)
  versionKey: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})

//建立照片数据模型
const photoSchema = new mongoose.Schema({
  userId: {   //通过此字段将照片和用户关联起来
    type: String
  },
  url: {   //存储照片的可访问地址
    type: String
  },
  isApproved: {   //照片审核字段
    type: Boolean,
    default: null,
    index: true
  },
  albumId: {   //相册ID
    type: mongoose.Schema.Types.ObjectId
  },
  created: {    //创建时间
    type: Date,
    default: Date.now
  },
  isDelete: {  //标记照片是否删除
    type: Boolean,
    default: false
  }
})

module.exports = {
  User: mongoose.model('User', userSchema),
  Phopto: mongoose.model('photo', photoSchema),
  Album: mongoose.model('album', albumSchema),
  Code: mongoose.model('code', codeSchema)
}