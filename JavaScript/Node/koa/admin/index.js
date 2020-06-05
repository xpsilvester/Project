const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const nunjucks = require('koa-nunjucks-2')
const path = require('path')
const koaStatic = require('koa-static')
const util = require('./util/util')
const axios = require('axios')
const {url} = require('./config.js')
// const logger = require('./middlewares/log')
// app.use(logger)
app.use(koaStatic(path.resolve(__dirname, 'public')))

//模板引擎
app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}))

app.use(bodyParser())

// 鉴权中间件
app.use(async (ctx, next) => {
  let _match = ['/login', '/qrcode', '/token', '/check'].indexOf(ctx.request.path) >= 0

  if (!_match) {
    let token = util.getToken(ctx)
    if (!token) {
      util.redirectToLogin(ctx)
    } else {
      let res = await axios.get(`${url}/my`, {
        headers: { 'x-session': token }
      })
      if (res.data.data && res.data.data.isAdmin) {
        ctx.state.token = token
        await next()
      } else {
        util.redirectToLogin(ctx)
      }
    }
  } else {
    await next()
  }
})

// //在应用中增加统一处理错误的中间件，用来处理在业务中抛出的异常，同时也为这些错误记录日志
// app.use(async (context, next) => {
//   try {
//     await next()   //执行下一个中间件
//   } catch (ex) {   //处理下一个中间件中的异常
//     context.logger.error(ex.stack || ex)    //记录错误日志
//     context.body = {    //输出接口信息给前端
//       status: -1,
//       message: ex.message || ex,   //输出错误信息
//       code: ex.status   //输出错误码
//     }
//   }
// })

router(app)
app.listen(3000)
