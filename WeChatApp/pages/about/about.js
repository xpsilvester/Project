// pages/about/about.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    itemList: [
      {
        id:1,
        name:'待发货',
        jump:'/pages/order/list/list?tagNum=1',
        img:'/images/sending.png',
        num:1
      },
      {
        id: 2,
        name: '待收货',
        jump: '/pages/order/list/list?tagNum=2',
        img: '/images/receiving.png',
        num: 1
      },
      {
        id: 3,
        name: '已完成',
        jump: '/pages/order/list/list?tagNum=3',
        img: '/images/success.png',
        num: 0
      }
    ],
    serviceNum:2,
    data: '(空)',
    cookie: null
  },
  // 设置公共参数
  setData: function (key, val) {
    this.data[key] = val;
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    });
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    this.logOn();
    this.getOrderList();
  },
  onShow: function () {

  },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  // 登录
  logOn: function () {
    
  },
  getOpenId: function () {
    
  },
  getOrderList: function () {
  }
})
