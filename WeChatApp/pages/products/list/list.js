// pages/products/list/list.js
let proListup = [{
  ProductPicSrc200: '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/6efc52e32da7595519d9907cc124a50c.jpg?thumb=1&w=720&h=792',
  ProductName: '红米Note 5 AI双摄',
  CurrentPrice: 1399,
  }
  , {
  ProductPicSrc200: '//i8.mifile.cn/v1/a1/2928abd1-0e07-b1ba-59cc-9f3410cf7fde!720x792.webp',
  ProductName: '小米6 变焦双摄',
  CurrentPrice: 2299,
}]
let proListdown = [
  {
  ProductPicSrc200: '//i8.mifile.cn/v1/a1/2928abd1-0e07-b1ba-59cc-9f3410cf7fde!720x792.webp',
  ProductName: '小米6 变焦双摄',
  CurrentPrice: 2299,
  },{ 
    ProductPicSrc200: '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/6efc52e32da7595519d9907cc124a50c.jpg?thumb=1&w=720&h=792',
    ProductName: '红米Note 5 AI双摄',
    CurrentPrice: 1399,
  }
]
let proListSale = [{
  ProductPicSrc200: '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/6efc52e32da7595519d9907cc124a50c.jpg?thumb=1&w=720&h=792',
  ProductName: '红米Note 5 AI双摄',
  CurrentPrice: 1399,
  }
  , {
    ProductPicSrc200: '//i8.mifile.cn/v1/a1/2928abd1-0e07-b1ba-59cc-9f3410cf7fde!720x792.webp',
    ProductName: '小米6 变焦双摄',
    CurrentPrice: 2299,
}]
let proListTime = [{
  ProductPicSrc200: '//i8.mifile.cn/v1/a1/2928abd1-0e07-b1ba-59cc-9f3410cf7fde!720x792.webp',
  ProductName: '小米6 变焦双摄',
  CurrentPrice: 2299,
  }
  , {
    ProductPicSrc200: '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/6efc52e32da7595519d9907cc124a50c.jpg?thumb=1&w=720&h=792',
    ProductName: '红米Note 5 AI双摄',
    CurrentPrice: 1399,
}]
let proList = wx.getStorageSync('proList');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'热销产品',
    proList: proList,
    tagNum:0,
    order:'▲',
    priceOrder:0
  },
  price:function(){
    let list,ord,pOrd;
    var self=this;
    if (this.data.priceOrder == 0){
      list = proListdown;
      ord = '▼';
      pOrd = 1;
    } else if (this.data.priceOrder == 2){
      list = this.data.proList;
      ord = this.data.order;
      if (this.data.order == '▼'){
        pOrd = 1;
      }else{
        pOrd = 0;
      }      
    } else {
      list = proListup;
      ord = '▲';
      pOrd = 0;
    }
    this.setData({
      proList: list,
      tagNum: 0,
      order: ord,
      priceOrder: pOrd
    })

  },
  priceup: function () {
    var self = this;
    self.setData({
      proList: proListup,
      tagNum: 0,
      order: '▲',
      priceOrder: 0
    })
  },
  sale:function(){
    this.setData({
      proList: proListSale,
      tagNum: 1,
      priceOrder: 2
    })
  },
  time: function () {
    this.setData({
      proList: proListTime,
      tagNum: 2,
      priceOrder: 2
    })
  },
  toProDetail: function (e) {
    wx.navigateTo({
      url: '/pages/products/detail/detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '热销产品'
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