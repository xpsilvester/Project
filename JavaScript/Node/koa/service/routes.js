const Router = require('koa-router')   //路由模块
const router = new Router()
const account = require('./actions/account') //用户相关操作
const auth = require('./middlewares/auth')  //用户鉴权中间件
const photo = require('./actions/photo')    //照片相关操作
const uuid = require('uuid')  //生成UID（唯一标识符）模块
const multer = require('koa-multer')  //文件上传功能模块
const path = require('path')  //路径模块

//获取请求中页面相关参数
function getPageParams(context) {
    return {
        pageIndex: parseInt(context.query.pageIndex) || 1,
        pageSize: parseInt(context.query.pageSize) || 10
    }
}

//成功响应
async function responseOK(ctx, next) {
    ctx.body = {
        status: 0
    }
    await next()
}
/**
 * 小程序登陆，接收小程序登陆获取的code
 */
router.get('/login', async (context, next) => {
    const code = context.query.code
    context.logger.info(`[login] 用户登陆Code为${code}`)
    context.body = {
        status: 0,
        data: await account.login(code)   //根据小程序传来的code获取相关用户 sessionKey 登录凭证
    }
})

/**
 * 修改用户信息
 */
router.put('/user', auth, async (context, next) => { //第二个参数可以传中间件
  context.logger.info(`[user] 修改用户信息, 用户ID为${context.state.user.id}, 修改的内容为${JSON.stringify(context.request.body)}`)
  await account.update(context.state.user.id, context.request.body)   //更新用户信息
  await next()
}, responseOK)

/**
 * 获取当前登陆的用户信息
 */
router.get('/my', auth, async (context, next) => {
  context.logger.info(`[user] 获取当前登陆的用户信息, 用户ID为${context.state.user.id}，返回内容为${context.state.user}`)
  context.body = {
    status: 0,
    data: context.state.user
  }
})

/**
 * 扫码登陆，获取二维码字符串
 */
router.get('/login/ercode', async (context, next) => {
    context.logger.debug(`[login] 生成登陆二维码`)
    context.body = {
        status: 0,
        data: await account.getErCode()  //将生成的二维码返回
    }
})

/**
 * 扫码登陆中，小程序侧调用的接口。将扫到的二维码信息传递过来
 */
router.get('/login/ercode/:code', auth, async (context, next) => {
    const code = context.params.code   //获取参数中的二维码字符串
    const sessionKey = context.get('x-session')  //获取置录凭证
    await account.setSessionKeyForCode(code, sessionKey)  //将登录凭证更新到二维码信息中
    await next()
}, responseOK)

/**
 * 轮询检查登陆状态
 */
router.get('/login/ercode/check/:code', async (context, next) => {  //轮询接口
    const startTime = Date.now()  //获取请求起始时间
    async function login() {  //定义登录方法
        const code = context.params.code  //获取二维码信息
        const sessionKey = await account.getSessionKeyByCode(code)  //获取登录凭证
        if (sessionKey) {
            context.body = {   //登录成功
                status: 0,
                data: {
                    sessionKey: sessionKey
                }
            }
        } else {
            if (Date.now() - startTime < 10000) {  //在10s 内
                await new Promise((resolve) => {
                    process.nextTick(() => {   //等待下一个tick 执行完成
                        resolve()
                    })
                })
                await login()   //继续递归查询
            } else {   //如果超时，则直接返回
                //无小程序状态测试
                context.body = {   //登录成功
                    status: 0,
                    data: {
                        sessionKey: '5a3f57f4432e2add8c1076214a50097c873cdb7e1b4a78c8654f61f3e3382161d1dcd3856d984e449bd867bfd462c1ab'
                    }
                }
                // context.body = {
                //     status: -1
                // }
            }
        }
    }
    await login()  //启动递归查询
})

/**
 * 获取相册列表
 */
router.get('/album', auth, async (context, next) => {
  const pageParams = getPageParams(context)
  const albums = await photo.getAlbums(context.state.user.id, pageParams.pageIndex, pageParams.pageSize)   //调用获取相册的逻辑
  context.body = {
    data: albums,
    status: 0
  }
})

/**
 * 小程序获取相册总列表
 */
router.get('/xcx/album', auth, async (context, next) => {
  const albums = await photo.getAlbums(context.state.user.id)
  context.body = {
    data: albums,
    status: 0
  }
})

/**
 * 获取某个相册的相片列表
 */
router.get('/album/:id', auth, async (context, next) => {
  const pageParams = getPageParams(context)
  const photos = await photo.getPhotos(context.state.user.id, context.params.id, pageParams.pageIndex, pageParams.pageSize)
  context.body = {
    status: 0,
    data: photos
  }
})
/**
 * 小程序种获取相册的相片列表
 */
router.get('/xcx/album/:id', auth, async (context, next) => {
  const photos = await photo.getPhotos(context.state.user.id, context.params.id)
  context.body = {
    status: 0,
    data: photos
  }
})

/**
 * 添加相册
 */
router.post('/album', auth, async (context, next) => {
  const {
    name
  } = context.request.body
  await photo.addAlbum(context.state.user.id, name)  //调用创建相册的逻辑
  await next()
}, responseOK)

/**
 * 修改相册
 */
router.put('/album/:id', auth, async (context, next) => {
  await photo.updateAlbum(context.params.id, context.request.body.name, context.state.user)
  await next()
}, responseOK)

/**
 * 删除相册
 */
router.del('/album/:id', auth, async (context, next) => {
  await photo.deleteAlbum(context.params.id)
  await next()
}, responseOK)

const storage = multer.diskStorage({   //定义为采用磁盘存储
  destination: path.join(__dirname, 'uploads'),  //定义存储的目录为uploads
  filename (req, file, cb) {   //对写入的文件进行重命名，避免重名
    const ext = path.extname(file.originalname) 
    cb(null, uuid.v4() + ext)  //存储的照片文件名随机
  }
})

const uplader = multer({   //得到上传的中间件
  storage: storage
})

/**
 * 上传相片
 */
router.post('/photo', auth, uplader.single('file'), async (context, next) => {
  const {
    file
  } = context.req    //读取上传的文件对象，由上传中间件提供
  const {
    id
  } = context.req.body   //读取请求中传递的相册ID
  await photo.add(context.state.user.id, `http://localhost:4001/${file.filename}`, id)
  await next()
}, responseOK)

/**
 * 删除相片
 */
router.delete('/photo/:id', auth, async (context, next) => {
  const p = await photo.getPhotoById(context.params.id)  //获取需要删除的照片信息
  if (p) {
    if (p.userId === context.state.user.id || context.state.user.isAdmin) {  //判断权限
      await photo.delete(context.params.id)   //删除照片
    } else {
      context.throw(403, '该用户无权限')
    }
  }
  await next()
}, responseOK)

/**
 * 按照状态获取相片列表，type类型如下：
 * pending：待审核列表
 * accepted：审核通过列表
 * rejected：审核未通过列表
 * all: 获取所有列表
 */
router.get('/admin/photo/:type', auth, async (context, next) => {
  const pageParams = getPageParams(context)  //获取分页参数
  //调用接口安装审核状态获取数据
  const photos = await photo.getPhotosByType(context.params.type, pageParams.pageIndex, pageParams.pageSize)
  context.body = {
    status: 0,
    data: photos
  }
})

/**
 * 修改照片信息
 */
router.put('/admin/photo/:id/', auth, async (context, next) => {
  if (context.state.user.isAdmin) {
    await photo.updatePhoto(context.params.id, context.request.body)
  } else {
    context.throw(403, '该用户无权限')
  }
  await next()
}, responseOK)

/**
 * 获取用户列表
 * type的值的类型为：
 * admin: 管理员
 * blocked: 禁用用户
 * ordinary: 普通用户
 * all: 全部用户
 */
router.get('/admin/user/:type', async (context, next) => {
  const pageParams = getPageParams(context)
  context.body = {
    status: 0,
    data: await account.getUsersByType(context.params.type, pageParams.pageIndex, pageParams.pageSize)
  }
  await next()
})

/**
 * 修改用户类型，userType=1 为管理员，0为普通用户 ， -1 为禁用用户
 */
router.put('/admin/user/setusertype/:id', async (context, next) => {
  const body = {
    status: 0,
    data: await account.setUserType(context.params.id, context.request.body.userType)
  }
  context.body = body
  await next()
})


/**
 * 修改用户数据
 */
router.put('/admin/user/:id', async (context, next) => {
  const body = {
    status: 0,
    data: await account.update(context.params.id, context.request.body)
  }
  context.body = body
  await next()
})

module.exports = router