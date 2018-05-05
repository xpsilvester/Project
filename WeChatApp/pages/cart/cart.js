// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    editOrComplete:'编辑',
    selectedAllStatus:false,
    totalPrice:0,
    canBuy:false,
    buyClass:'',
    cartDeleteClass:'',
    deleteClass:'',
    canDelete:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.setNavigationBarTitle({
      title: '购物车'
    });

  },

  /**
   * 全选
   */
  selectAll: function () {
    //全选设置
    let list = this.data.cartList;
    let selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;
    let price = 0;
    let buy = false;
    let bClass = '';
    let dClass = '';
    let cDelete = false;
    
    //单选设置
    if (selectedAllStatus){
      for(let i = 0;i < list.length;i++){
        list[i].selected = true;
        //立即购买
        buy = true;
        bClass = 'buy-now-active';
        //可删除
        dClass = 'delete-active';
        cDelete = true;
      }
    }
    else{
      for (let i = 0; i < list.length; i++) {
        list[i].selected = false;
        //取消购买
        buy = false;
        bClass = '';
        //不可删除
        dClass = '';
        cDelete = false;
      }
    }
    //计价
    price = this.getTotalPrice();

    this.setData({
      selectedAllStatus: selectedAllStatus,
      cartList: list,
      totalPrice: price,
      canBuy: buy,
      buyClass: bClass,
      deleteClass: dClass,
      canDelete: cDelete
    });
  },

  /**
   * 单选
   */
  selectOne: function (e) {
    //单选设置
    let id = e.target.dataset.id - 1;
    let list = this.data.cartList;
    let price = 0;
    let buy = false;
    let bClass = '';
    let dClass = '';
    let cDelete = false;

    list[id].selected = !list[id].selected;
    
    //全选设置
    let flag = this.data.selectedAllStatus;
    for(let i = 0;i < list.length;i++){
      if(list[i].selected == false){
        flag = false;
        break;
      }
      else{
        flag = true;
      }
    }

    //计价
    price = this.getTotalPrice();

    //立即购买
    if(!this.hasSeleted()){
      bClass = '';
      buy = false;
      //不可删除
      dClass = '';
      cDelete = false;
    }
    else{
      bClass = 'buy-now-active';
      buy = true;
      //可删除
      dClass = 'delete-active';
      cDelete = true;
    }

    this.setData({
      cartList: list,
      selectedAllStatus: flag,
      totalPrice: price,
      buyClass: bClass,
      canBuy: buy,
      deleteClass: dClass,
      canDelete: cDelete
    });
  },

  /**
   * 编辑购物车
   */
  editCartList:function () {
    let word = this.data.editOrComplete;
    let cdClass = '';
    let dClass = '';
    let dflag = false;
    let cDelete = false;
    let price = 0;
    let list = this.data.cartList;

    if (word == '编辑'){
      //“编辑”变为“完成”的情况（“编辑”点击）
      //文字改变
      word = '完成';

      //删除(active)
      cdClass = 'cart-delete-active';
      if(this.hasSeleted()){
        dClass = 'delete-active';
        cDelete = true;
      }
      else{
        dClass = '';
        cDelete = false;
      }
      //初始化“-”
      for(let i = 0;i < list.length;i++){
        if(list[i].num <= 1){
          list[i].minusClass = 'minus-disable';
        }
        else{
          list[i].minusClass = '';
        }
      }
    }
    else{
      //“完成”变为“编辑”的情况（“完成”点击）
      //文字改变
      word = '编辑';

      //删除
      // cdClass = '';
      dClass = '';
      cDelete = false;
    }

    price = this.getTotalPrice();

    this.setData({
      editOrComplete: word,
      cartDeleteClass: cdClass,
      deleteClass: dClass,
      canDelete: cDelete,
      totalPrice: price,
      cartList: list
    });
  },

  /**
   * 跳转处理
   */
  getJumpURL: function (e) {
    let status = this.data.editOrComplete;
    let id = e.currentTarget.dataset.id - 1;
    let list = this.data.cartList;
    if(status == '编辑'){
      wx.navigateTo({
        url: list[id].jump
      });
    }
  },

  /**
   * 数量减少
   */
  minus: function (e) {
    let id = e.target.dataset.id - 1;
    let list = this.data.cartList;
    if(list[id].num <= 1){
      //图案变灰
      list[id].minusClass = 'minus-disable';
    }
    else{
      //数量-1
      list[id].num--;
      if (list[id].num <= 1) {
        //图案变灰
        list[id].minusClass = 'minus-disable';
      }
      else{
        //图案正常
        list[id].minusClass = '';
      }
    }

    this.setData({
      cartList: list
    });
    wx.setStorageSync('cartList', list);
  },

  /**
   * 数量增加
   */
  plus: function (e) {
    let id = e.target.dataset.id - 1;
    let list = this.data.cartList;

    //图案正常
    list[id].minusClass = '';
    //数量+1
    list[id].num++;

    this.setData({
      cartList: list
    });
    wx.setStorageSync('cartList', list);
  },

  /**
   * 数量修改
   */
  changeNum: function (e) {
    let id = e.target.dataset.id - 1;
    let list = this.data.cartList;
    let val = parseInt(e.detail.value);

    if(val > 1 && val != NaN && val != undefined){
      //图案正常
      list[id].minusClass = '';
      //数量+1
      list[id].num = val;
    }
    else{
      //图案变灰
      list[id].minusClass = 'minus-disable';
      //数量为1
      list[id].num = 1;
    }

    this.setData({
      cartList: list
    });
    wx.setStorageSync('cartList', list);
  },

  /**
   * 计算总价
   */
  getTotalPrice: function () {
    let list = this.data.cartList;
    let price = 0;
    for(let i = 0;i < list.length;i++){
      if(list[i].selected){
        price += list[i].price * list[i].num;
      }
    }
    return price;
  },

  /**
   * 是否有选中项
   */
  hasSeleted: function () {
    let list = this.data.cartList;
    let flag = false;
    for(let i = 0;i < list.length;i++){
      if(list[i].selected){
        flag = true;
        break;
      }
    }
    //console.log("hasSeleted:"+flag);
    return flag;
  },

  /**
   * 立即购买
   */
  toBuy: function () {
    let list = this.data.cartList;
    let payList = new Array();
    for(let i = 0;i < list.length;i++){
      if(list[i].selected){
        payList.push(list[i]);
      }
    }
    wx.setStorageSync("payList", payList);
    wx.navigateTo({
      url: '/pages/order/pay/pay'
    });
  },

  /**
   * 删除指定商品
   */
  deleteSelected:function () {
    let list = this.data.cartList;
    let newlist = new Array();
    for(let i = 0;i < list.length;i++){
      if(!list[i].selected){
        //list.splice(i,1);
        newlist.push(list[i]);
      }
    }
    //重置列表数据
    for (let i = 0; i < newlist.length; i++) {
      newlist[i].id = i + 1;
      newlist[i].selected = false;
      newlist[i].minusClass = 'minus-disable';
    }
    //重置页面数据
    this.setData({
      cartList: newlist,
      editOrComplete: '编辑',
      selectedAllStatus: false,
      totalPrice: 0,
      canBuy: false,
      buyClass: '',
      cartDeleteClass: '',
      deleteClass: '',
      canDelete: false
    });
    wx.setStorageSync('cartList', newlist);
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
    let list = wx.getStorageSync('cartList');
    //console.log(list);
    for (let i = 0; i < list.length; i++) {
      list[i].id = i + 1;
      list[i].selected = false;
      list[i].minusClass = 'minus-disable';
    }

    this.setData({
      cartList: list,
      selectedAllStatus: false
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