const Router = require('koa-router')
const router = new Router()
const account = require('./actions/account')

function getPageParams(context) {
    return {
        pageIndex: parseInt(context.query.pageIndex) || 1,
        pageSize: parseInt(context.query.pageSize) || 10
    }
}

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
        data: await account.login(code)
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
router.get('/login/errcode/check/:code', async (context, next) => {  //轮询接口
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
                context.body = {
                    status: -1
                }
            }
        }
    }
    await login()  //启动递归查询
})
