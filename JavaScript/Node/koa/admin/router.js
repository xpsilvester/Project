const router = require('koa-router')()

const loginController = require('./controller/login')
const photoController = require('./controller/photo')
const userController = require('./controller/user')

module.exports = (app) => {
  // 获取登陆页面
  router.get('/', loginController.index)
  router.get('/login', loginController.index)
  router.get('/qrcode', loginController.getQrcode)
  router.get('/token', loginController.getToken)
  router.get('/check', loginController.checkAuth)

  // 获取照片列表
  router.get('/photos/:status', photoController.getPhotos)
  // 操作照片
  router.put('/photos/:id', photoController.editPhotos)

  // 获取用户列表
  router.get('/users/:status', userController.getUsers)
  // 操作用户权限
  router.put('/users/:id', userController.editUsers)

  // 退出登陆
  router.get('/logout', loginController.logout)

  app.use(router.routes()).use(router.allowedMethods())
}
