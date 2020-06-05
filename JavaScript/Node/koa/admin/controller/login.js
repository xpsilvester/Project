const util = require('../util/util.js')
const axios = require('axios')
const {url} = require('../config.js')

module.exports = {
  //首页
  index: async (ctx, next) => {
    //如果有token就跳转到/photos/all ， 否则显示登录页
    if (ctx.state.token) {
      ctx.status = 302
      ctx.redirect('/photos/all')
    } else {
      await ctx.render('login/login')
    }
  },
  //获取二维码信息
  getQrcode: async (ctx, next) => {
    const res = await axios.get(`${url}/login/ercode`)
    ctx.response.body = res.data.data
  },
  //获取token
  getToken: async (ctx, next) => {
    const res = await axios.get(`${url}/login/ercode/check/${ctx.query.code}`)
    ctx.response.body = res.data
    if (res.data.data) {
      util.setToken(ctx, res.data.data.sessionKey)
    }
  },
  //鉴权
  checkAuth: async (ctx, next) => {
    let res = await axios.get(`${url}/my`, {
      headers: {
        'x-session': util.getToken(ctx)
      }
    })
    ctx.response.body = res.data
  },
  //退出登录
  logout: async (ctx, next) => {
    util.redirectToLogin(ctx)
  }
}
