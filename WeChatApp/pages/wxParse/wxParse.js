// pages/wxParse/wxParse.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var article = '<div>我是HTML代码</div>';
    var img = '<img alt="" src="//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/27755e05b09bbe8c870cdd5398e24507.jpg?thumb=1&w=720&h=792" style="width: 1200px; height: 902px;" /><img alt="" src="//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/a9204d177d4f4ef2e7436edc05d7bcce.jpg?thumb=1&w=720&h=792" style="width: 1200px; height: 1208px;" />'
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 5);
    WxParse.wxParse('img', 'html', img, that, 5);
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