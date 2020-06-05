const model = require('../model/home.js')
const axios = require('axios')
const {url} = require('../config.js')

module.exports = {
  //获取图片
  getPhotos: async (ctx, next) => {
    console.log('获取图片：'+ctx.params.status)
    let status = ctx.params.status || 'all'
    let count = 12
    let index = ctx.request.querystring ? ctx.request.query.index : 1
    let column = ctx.request.querystring ? ctx.request.query.column : 3

    // 调接口
    let res = await axios.get(
      `${url}/admin/photo/${status}?pageIndex=${index}&pageSize=${count}`, {
        headers: {
          'x-session': ctx.state.token
        }
      }
    )
    console.log(`请求接口：${url}/admin/photo/${status}?pageIndex=${index}&pageSize=${count} 获取到数据：${res.data.data.data}`)
    await ctx.render('home/photos', {
      menu: model.getMenu(),
      activeMenu: 0,
      photos: res.data.data.data || [],
      page: Math.ceil(res.data.data.count / count),
      column: column,
      index: parseInt(index),
      status: status
    })
  },
  //编辑图片
  editPhotos: async (ctx, next) => {
    let isApproved = ctx.request.body.type === 0 ? null : (ctx.request.body.type === 1)
    let res = await axios.put(`${url}/admin/photo/${ctx.params.id}`, { isApproved }, {
      headers: { 'x-session': ctx.state.token }
    })

    ctx.body = res.data
  }
}
