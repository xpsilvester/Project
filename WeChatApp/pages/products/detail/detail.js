// pages/products/detail/detail.js
let proDetail={
  transRate:'11AC1167Mbps',
  routerType:'无线'
}
let cartList = wx.getStorageSync('cartList') || [];
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proDetail: proDetail,
    stock: 933,
    addButton:'加入购物车',
    boxFlag:true,
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  //页面跳转
  toArgs: function (e) {
    wx.navigateTo({
      url: '/pages/products/detail/args'
    })
  },
  toCart: function (e) {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  toPay: function (e) {
    var $this = this;
    var testProduct = this.data.cartProduct;
    testProduct.num = this.data.num;
    let payList = [];
    payList.push(testProduct);
    wx.setStorageSync('payList', payList);
    wx.navigateTo({
      url: '/pages/order/pay/pay'
    })
  },
  toAddCart:function(e){
    var $this=this;
    var testProduct = this.data.cartProduct;
    testProduct.num=this.data.num;
    var flag=0;
    for(let i=0;i<cartList.length;i++){
      if (cartList[i].proId == testProduct.proId){
        cartList[i].num = parseInt(cartList[i].num) + parseInt(testProduct.num);
        flag = 1;
      }
    }
    flag == 0 ? cartList.push(testProduct):'';
    console.log(cartList);
    this.setData({
      cartNum: cartList.length
    })
    wx.setStorageSync('cartList', cartList);
    console.log(cartList);
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 2000
    }) 
    this.addHide();
  },
  /**
   * 弹出层函数
   */
  //出现
  addCart: function () {

    this.setData({ boxFlag: false, addButton: '加入购物车'})

  },
  addBuy: function () {

    this.setData({ boxFlag: false, addButton: '立即购买'})

  },
  //消失
  addHide: function () {

    this.setData({ boxFlag: true })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情'
    });
    options.SysNo = options.SysNo || 682;
    console.log(options.SysNo);
    //获取产品列表
    let proId1;
    let proList1=wx.getStorageSync('proList');
    for(let i=0;i<proList1.length;i++){
      if (proList1[i].SysNo == options.SysNo){
        proId1=i;
      }
    }
    let productItem = proList1[proId1];
    let cartProduct = {
      proId: productItem.SysNo,
      title: productItem.ProductName,
      price: productItem.CurrentPrice,
      num: parseInt(this.data.num),
      img: productItem.ProductPicSrc200,
      jump: '/pages/products/detail/detail?SysNo=' + productItem.SysNo,
    };
    this.setData({
      proId: proId1,
      proListArray: proList1,
      cartProduct: cartProduct,
      imgUrls: productItem.swiper
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
    cartList = wx.getStorageSync('cartList') || [];
    this.setData({
      cartNum: cartList.length
    });
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