const {
  findBySessionKey
} = require('../lib/db/user')
module.exports = async function (context, next) {
  const sessionKey = context.get('x-session') //获取登录凭证
  context.logger.debug(`[auth] 获取到到sessionKey为${sessionKey}`)
  if (!sessionKey) {   //如果无登录凭证，则登录失败
    context.throw(401, '请求头中未包含x-session')
  }
  const user = await findBySessionKey(sessionKey)  //根据登录凭证获取用户
  if (user) {    //获取到用户信息
    context.logger.debug(`[auth] 根据sessionKey查询到的用户为${JSON.stringify(user)}`)
    if (user.userType === -1) {
      context.throw(401, '当前用户被禁用')
    }
    context.state.user = {   //将用户信息存储到上下文中，便于后续使用
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      isAdmin: user.userType === 1
    }
  } else {  //未找到用户，则登录失败
    context.logger.info(`[auth] 根据sessionKey未获取到用户`)
    context.throw(401, 'session 过期')
  }

  if (/^\/admin/i.test(context.url) && !context.state.user.isAdmin) {  //鉴权判断
    context.logger.info(`[auth] 当前的${context.url} 必须为管理员访问.`)
    context.throw(401, '当前资源必须管理员才能访问')
  }
  await next()
}
