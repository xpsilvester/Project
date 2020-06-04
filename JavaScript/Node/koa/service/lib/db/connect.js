//连接mongoose数据库
const mongoose = require('mongoose')
const { name, user, password } = require('../../config').db  //引入配置文件
module.exports = {
  open() {
    return mongoose.connect(name, {
      user: user,
      pass: password,
      poolSize: 10
    })
  },
  close() {
    return mongoose.connection.close()
  }
}
