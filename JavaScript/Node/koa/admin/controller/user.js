const model = require('../model/home.js')
const axios = require('axios')
const {url} = require('../config.js')

module.exports = {
  //获取用户
  getUsers: async (ctx, next) => {
    let status = ctx.params.status || 'all'
    let count = 10
    let index = ctx.request.querystring ? ctx.request.query.index : 1

    // 调服务接口获取数据
    let res = await axios.get(
      `${url}/admin/user/${status}?pageIndex=${index}&pageSize=${count}`, {
        headers: {
          'x-session': ctx.state.token
        }
      }
    )

    await ctx.render('home/users', {
      menu: model.getMenu(),
      activeMenu: 1,
      users: res.data.data.data || [],
      page: Math.ceil(res.data.data.count / count),
      index: parseInt(index),
      status: status
    })
  },
  //编辑用户
  editUsers: async (ctx, next) => {
    let _type = ctx.request.body.type.toString()
    let res = await axios.put(`${url}/admin/user/${ctx.params.id}`, { userType: _type}, {
      headers: { 'x-session': ctx.state.token }
    })

    ctx.body = res.data
  }
}
