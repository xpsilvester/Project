// pages/order/pay/pay.js
let orderList;
//[
//   {
//     id: 1,
//     imgSrc: '/images/5adec202Ndea433bd.jpg',
//     title: 'TL-WDR5660 AC1200双频无线路由器',
//     price: 119.90,
//     num: 2
//   }, {
//     id: 2,
//     imgSrc: '/images/5adec202Ndea433bd.jpg',
//     title: 'TL-WDR5660 AC1200双频无线路由器',
//     price: 1129.90,
//     num: 1
//   }, {
//     id: 3,
//     imgSrc: '/images/5adec202Ndea433bd.jpg',
//     title: 'TL-WDR5660 AC1200双频无线路由器',
//     price: 29.90,
//     num: 1
//   }
// ];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData : null
  },
  //页面跳转
  toAddress: function (e) {
    var $this=this;
    wx.chooseAddress({
      success: function (res) {
        $this.setData({
          addressData: {
            userName: res.userName,
            postalCode: res.postalCode,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            nationalCode: res.nationalCode,
            telNumber: res.telNumber
          }
        })
        console.log($this.data.addressData)
        console.log($this.data.addressData.userName.length)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '确认购买'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    orderList = wx.getStorageSync('payList') || [];
    this.setData({
      orderList: orderList
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})