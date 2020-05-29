const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const {
  connect,
  close
} = require('./lib/conn')
const {
  getCourseList,
  getCourseById,
  updateCourse,
  removeCourse,
  addCourse
} = require('./lib')
//解析post数据
const bodyParser = require('koa-bodyparser')

const JSON_MIME = 'application/json'

//获取课程列表
router.get('/course', async (context) => {
  context.type = JSON_MIME
  context.body = {
    status: 0,
    data: await getCourseList()
  }
})

//通过id获取课程
router.get('/course/:id', async context => {
  context.type = JSON_MIME
  context.body = {
    status: 0,
    data: await getCourseById(context.params.id)
  }
})

//新增课程
// {
// 	"name":"计算机网络",
// 	"weekday": 1,
// 	"startTime": 1590939257738,
// 	"endTime": 1590839257738
// }
router.post('/course', async context => {
  context.type = JSON_MIME
  await addCourse(context.request.body)
  context.body = {
    status: 0
  }
})

//更新课程数据
router.put('/course/:id', async context => {
  await updateCourse(context.params.id, context.request.body)
  context.body = {
    status: 0
  }
})

//删除课程
router.delete('/course/:id', async context => {
  await removeCourse(context.params.id)
  context.body = {
    status: 0
  }
})

app.use(bodyParser())

app.use(async (context, next) => {
  //错误拦截
  try {
    await next()
  } catch (error) {
    context.type = JSON_MIME
    context.body = {
      status: -1,
      message: error.message
    }
  }
})

app.use(async (context, next) => {
  await connect()
  await next()
  await close()
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4001)