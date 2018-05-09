//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    cookie:null,
    //实现cookie添加
    cookieUtil: {
      add: function (cookieOld, cookieNew) {
        var arr1 = cookieOld.split(';');
        var arr2 = cookieNew.split(';');
        var arr10 = [], arr20;
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr2.length; j++) {
            var arr3 = arr1[i].split('=');
            var arr4 = arr2[j].split('=');
            if (arr3[0].trim() == arr4[0].trim()) {
              arr1[i] = arr2[j];
              break;
            }
            if (!this.contain(arr10, arr2[j]) && !this.contain(arr1, arr2[j])) {
              arr10.push(arr2[j]);
            }
          }
        }

        if (arr10.length > 0) {
          arr20 = arr1.concat(arr10);
        } else {
          arr20 = arr1
        }
        return arr20.join(';');

      },
      contain: function (arr, item) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == item) {
            return true;
          }
        }
        return false;
      }
    }
  }
})