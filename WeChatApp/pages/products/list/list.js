// pages/products/list/list.js
let proListup;
let proListdown = [];
let proListSale = [];
let proListTime = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '全部',
    tagNum: 0,
    order: '▲',
    priceOrder: 0
  },
  //排序
  sort: function (arr, key) {
    var flag = 0;
    do {
      flag = 1;
      for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i][key] > arr[i + 1][key]) {
          var temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          flag = 0;
        }
      }
    }
    while (flag == 0)
  },
  //按价格
  price: function () {
    let list, ord, pOrd;
    var self = this;
    if (this.data.priceOrder == 0) {
      list = proListdown;
      ord = '▼';
      pOrd = 1;
    } else if (this.data.priceOrder == 2) {
      // list = this.data.proList;
      ord = this.data.order;
      if (this.data.order == '▼') {
        list = proListdown
        pOrd = 1;
      } else {
        list = proListup;
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
  //按销量
  sale: function () {
    this.setData({
      proList: proListSale,
      tagNum: 1,
      priceOrder: 2
    })
  },
  //按时间
  time: function () {
    this.setData({
      proList: proListTime,
      tagNum: 2,
      priceOrder: 2
    })
  },
  //页面跳转
  toProDetail: function (e) {
    var SysNo = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/products/detail/detail?SysNo=' + SysNo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let className = options.className || '全部';
    wx.setNavigationBarTitle({
      title: className
    })

    let proList = wx.getStorageSync('proList');
    proListdown = wx.getStorageSync('proList');
    proListSale = wx.getStorageSync('proList');
    proListTime = wx.getStorageSync('proList');
    this.sort(proList, 'CurrentPrice');
    proListup = proList;
    this.setData({
      proList: proList,
      className: className
    })
    this.sort(proListdown, 'CurrentPrice');
    proListdown.reverse();
    this.sort(proListSale, 'SaleQty');
    this.sort(proListTime, 'CreateTime');
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