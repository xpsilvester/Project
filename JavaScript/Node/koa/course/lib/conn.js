//建立mongodb数据库连接
const mongoose = require('mongoose')
async function connect () {
  await mongoose.connect('mongodb://localhost:27017/course', {
    user: '',
    pass: ''
  })
}

async function close () {
  await mongoose.connection.close()
}
module.exports = {
  mongoose,
  connect,
  close
}
