const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser') //解析post参数
const staticFiles = require('koa-static')  //解析静态文件
const app = new Koa()
const JSON_MIME = 'application/json'    //json类型
const {open} = require('./lib/db/connect')  //数据库连接
const router = require('./routes')  //路由
const cors = require('@koa/cors')  //koa开启cors允许跨域
const logger = require('./middlewares/log')
open()

app.use(logger)
app.use(cors({
  origin: 'http://xxxx.com',    //允许跨域请求源
  credentials: true    //允许携带cookies
}))

app.use(bodyParser({multipart: true}))  //允许文件上传

app.use(staticFiles(path.resolve(__dirname, './uploads'), {
  maxage: 30 * 24 * 60 * 60 * 1000
}))

app.use(async (context, next) => {
  context.type = JSON_MIME
  await next()
})

//在应用中增加统一处理错误的中间件，用来处理在业务中抛出的异常，同时也为这些错误记录日志
app.use(async (context, next) => {
  try {
    await next()   //执行下一个中间件
  } catch (ex) {   //处理下一个中间件中的异常
    context.logger.error(ex.stack || ex)    //记录错误日志
    context.body = {    //输出接口信息给前端
      status: -1,
      message: ex.message || ex,   //输出错误信息
      code: ex.status   //输出错误码
    }
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4001)
console.log('app start at 4001')