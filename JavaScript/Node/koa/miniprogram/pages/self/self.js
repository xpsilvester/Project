import connect from "../../utils/connect"
import SERVER from "../../server/index"

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
Page(connect(mapStateToProps)({
  getUserInfoHandle: function (e) {

    let userInfo = e.detail.userInfo;

    if (userInfo) {

      wx.showLoading({ title: 'loading...', mask: true })

      SERVER.updateUserInfo({
        avatar: userInfo.avatarUrl,
        name: userInfo.nickName
      }).catch(e => {
        wx.hideLoading()
        console.log(e)
      }).then(() => {
        getApp().getUserInfo()
      })
    } else {
      wx.showToast({ title: '请允许iKcamp申请的微信授权操作', icon: 'none', mask: true, duration: 3000 })
    }
  },
  scanQrcodeHandle(e) {

    wx.scanCode({
      onlyFromCamera: true
    }).then(res => {
      SERVER.scanCode(res.result).then(e => {
        wx.showToast({ title: '扫码登录成功', icon: 'success', duration: 2000 })
      }).catch(e => {
        wx.showToast({ title: '二维码过期，请单击二维码刷新后重试', icon: 'none', mask: true, duration: 2000 })
      })

    }).catch(e => {
      console.log(e)
    })
  }
}))