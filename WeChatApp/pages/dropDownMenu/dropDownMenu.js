// pages/dropDownMenu/dropDownMenu.js
let ReportDataSync = [
  {
    reportType: "日报1",
    chilItem: [
      { ID: 1, Name: "日报1", ReportUrl: "DailyReport.aspx", Type: 1 },
      { ID: 2, Name: "日报2", ReportUrl: "DailyReport.aspx", Type: 1 },
      { ID: 3, Name: "日报3", ReportUrl: "DailyReport.aspx", Type: 1 }]
  },
  {
    reportType: "目录2",
    chilItem: [
      { ID: 1, Name: "目录1", ReportUrl: "DailyReport.aspx", Type: 2 },
      { ID: 2, Name: "目录2", ReportUrl: "DailyReport.aspx", Type: 2 },
      { ID: 3, Name: "目录3", ReportUrl: "DailyReport.aspx", Type: 2 },
      { ID: 4, Name: "目录4", ReportUrl: "DailyReport.aspx", Type: 2 }]
  },
  {
    reportType: "月报3",
    chilItem: [
      { ID: 1, Name: "月报1", ReportUrl: "DailyReport.aspx", Type: 1 },
      { ID: 2, Name: "月报2", ReportUrl: "DailyReport.aspx", Type: 2 }]
  }
]  
//定义字段  
var initSubMenuDisplay = []
var initSubMenuHighLight = []
var initAnimationData = []  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportData: ReportDataSync,//菜单数据  
    subMenuDisplay: initSubMenuDisplay, //一级  
    subMenuHighLight: initSubMenuHighLight, //二级  
    animationData: initAnimationData //动画  
  },
  //一级菜单点击  
  tapMainMenu: function (e) {
    //获取当前一级菜单标识  
    var index = parseInt(e.currentTarget.dataset.index);
    //改变显示状态  
    for (var i = 0; i < initSubMenuDisplay.length; i++) {
      if (i == index) {
        if (this.data.subMenuDisplay[index] == "show") {
          initSubMenuDisplay[index] = 'hidden'
        } else {
          initSubMenuDisplay[index] = 'show'
        }
      } else {
        initSubMenuDisplay[i] = 'hidden'
      }
    }
    this.setData({
      subMenuDisplay: initSubMenuDisplay
    })
    this.animation(index)
  }, 
  //二级菜单点击  
  tapSubMenu: function (e) {
    //隐藏所有一级菜单  
    //this.setData({  
    //subMenuDisplay: initSubMenuDisplay()  
    //});  
    // 当前二级菜单的标识  
    var indexArray = e.currentTarget.dataset.index.split('-');
    // 删除所在二级菜单样式  
    for (var i = 0; i < initSubMenuHighLight.length; i++) {
      if (indexArray[0] == i) {
        for (var j = 0; j < initSubMenuHighLight[i].length; j++) {
          initSubMenuHighLight[i][j] = '';
        }
      }
    }
    //给当前二级菜单添加样式  
    initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    //刷新样式  
    this.setData({
      subMenuHighLight: initSubMenuHighLight
    });
    // 设置动画  
    this.animation(indexArray[0]);
  },

  //菜单动画  
  animation: function (index) {
    // 定义一个动画  
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
    })
    // 是显示还是隐藏  
    var flag = this.data.subMenuDisplay[index] == 'show' ? 1 : -1;
    // 使之Y轴平移  
    //animation.translateY(flag * ((initSubMenuHighLight[index].length + 1) * 38)).step();
    // 导出到数据，绑定给view属性  
    var animationStr = animation.export();
    // 原来的数据  
    var animationData = this.data.animationData;
    animationData[index] = animationStr;
    this.setData({
      animationData: animationData
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    function loadDropDownMenu() {
      for (var i = 0; i < ReportDataSync.length; i++) {
        //一级目录  
        initSubMenuDisplay.push('hidden')
        //二级目录  
        var report = []
        for (var j = 0; j < ReportDataSync[i].chilItem.length; j++) {
          report.push([''])
        }
        initSubMenuHighLight.push(report)
        //动画  
        initAnimationData.push("")
      }
    }  
    /// 初始化DropDownMenu  
    loadDropDownMenu()  
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