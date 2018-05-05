//index.js
//获取应用实例
const app = getApp()
//假数据
let proList=[{
  SysNo: 111,
  ProductPicSrc200: '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/6efc52e32da7595519d9907cc124a50c.jpg?thumb=1&w=720&h=792',
  ProductName: '红米Note 5 AI双摄',
  CurrentPrice: 1399,
  BasicPrice: 1499,
  ProductDescLong: [
    '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/63bcf275fd8393325c6f343b3c89e5c9.jpg?w=1080&h=1735',
    '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/bfb8f59814fa33003e94451eeaba0f9f.jpg?w=1080&h=1397',
    '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/202a31934625738bb2e10dcdd2d28118.jpg?w=1080&h=1800'
  ],
  swiper:[
    'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/6efc52e32da7595519d9907cc124a50c.jpg?thumb=1&w=720&h=792',
    'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/2764f1f61a5a7691ee5f4998e6e83666.jpg?thumb=1&w=720&h=792',
    'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/9b0900deeb89fb9b2ee8faa239a27380.jpg?thumb=1&w=720&h=792'
  ]
}, {
  SysNo: 121,
  ProductPicSrc200: '//i8.mifile.cn/v1/a1/2928abd1-0e07-b1ba-59cc-9f3410cf7fde!720x792.webp',
  ProductName: '小米6 变焦双摄',
  CurrentPrice: 2299,
  BasicPrice: 2499,
  ProductDescLong: [
    '//i8.mifile.cn/v1/a1/80986f52-42e8-95cb-d420-4acc958a0aef.jpg?w=1080&h=1923&s=181.6',
    '//i8.mifile.cn/v1/a1/1f9cdfc0-3b38-a61b-2f7a-559f912384a2.jpg?w=1080&h=1349&s=181',
    '//i8.mifile.cn/v1/a1/787cc19e-b33f-5afd-c8c2-ed042598481d.jpg?w=1080&h=1508&s=160.7'
  ],
  swiper: [
    '//i8.mifile.cn/v1/a1/2928abd1-0e07-b1ba-59cc-9f3410cf7fde!720x792.webp',
    '//i8.mifile.cn/v1/a1/3c96e923-284b-0d4c-b7e3-e3e6acd713f1!720x792.webp',
    '//i8.mifile.cn/v1/a1/a25fd308-dce7-393e-3113-02d52b817d5d!720x792.webp',
  ]
}];
Page({
  data: {
    logo:'XP-SIL',
    logoTitle: 'XP-SIL商城',
    logoUrl:'/images/logo.png',
    showAll:'店铺全部商品',
    category:'手机',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面跳转
  toProList: function (e) {
    wx.navigateTo({
      url: '/pages/products/list/list',
    })
  },
  toProDetail: function (e) {
    var SysNo = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/products/detail/detail?SysNo=' + SysNo
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.setStorageSync('proList', proList);
    this.setData({
      proList: proList,
    })
    console.log(proList);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function() {
    return {
      title: data.logoTitle,
      desc: '',
      path: '/pages/index/index'
    }
  }
})
