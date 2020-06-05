const env = process.env
const appKey = env.APP_KET || 'appKey'
const appSecret = env.APP_SECRET || 'appSecret'
const nodeEnv = env.NODE_ENV
const isTest = true;

let db = {
  name: 'mongodb://127.0.0.1:27017/miniprogram',
  user: '',
  password: ''
}
if (nodeEnv === 'production') {
  db = {
    name: 'mongodb://127.0.0.1:27017/xcx',
    user: 'user',
    password: 'pass'
  }
}

module.exports = {
  appKey,
  appSecret,
  db,
  isTest
}
