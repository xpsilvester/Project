const token = 'token'

module.exports = {
  //从cookies里面获取token
  getToken (ctx) {
    return ctx.cookies.get(token)
  },
  //在cookies中设置token
  setToken (ctx, value) {
    ctx.cookies.set(token, value)
  },
  //清除cookies中的token
  clearToken (ctx) {
    ctx.cookies.set(token, '', {
      expires: new Date('2000-01-01')
    })
  },
  //退出登录
  redirectToLogin (ctx) {
    this.clearToken(ctx)
    ctx.status = 302
    ctx.redirect('/login')
  }
}
