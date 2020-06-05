import SERVER from "../../server/index"
Page({
  data: {
    pics: [],
    hidden: true,
    fm: SERVER.FM
  },
  onShow(){
    this.getPics()
  },
  getPics() {

    wx.showLoading({ title: 'loading...', mask: true })

    SERVER.getPics().then(res => {
      this.setData({ pics: res.data.data })
      wx.hideLoading()
    }).catch(e => {
      wx.hideLoading()
      console.log(e)
    })
  },
  create() {
    this.setData({ hidden: false })
  },
  onAddPics(e) {
    wx.showLoading({ title: '提交中...', mask: true })
    SERVER.addPics(e.detail.name).then(res => {
      if (res.data.status == 0) this.getPics()
    }).finally(() => {
      wx.hideLoading()
      this.setData({ hidden: true })
    })
  },
  onGoBack() {
    wx.hideLoading()
    this.setData({ hidden: true })
  },
  toDetail(evt) {
    let { id, name } = evt.currentTarget.dataset
    wx.navigateTo({ url: `../pic/pic?id=${id}&name=${name}` })
  }
})