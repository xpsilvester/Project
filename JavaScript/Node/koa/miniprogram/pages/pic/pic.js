import SERVER from "../../server/index"
import { formatTime } from "../../utils/formatTime"

Page({
  data: {
    id: '',
    name: '相册',
    fm: SERVER.FM,
    pics: [],
    nums: 0
  },
  onLoad(options) {

    const { id, name } = options

    this.setData({ id, name })

    wx.setNavigationBarTitle({ title: name })

    this.getPic()
  },
  getPic() {

    SERVER.getPic(this.data.id).then(res => {
      if (res.data.status == 0) {

        const { count, data } = res.data.data

        let pics = count ?this.reSort(data):[]

        this.setData({ pics, nums: count })
      }
    })
  },
  reSort(d = []) {
    let result = []
    let flag = null

    d.forEach(e => {

      let eT = formatTime(new Date(e.created))

      e.created = eT

      let _index = result.length

      if (eT !== flag) {
        flag = eT
      } else {
        _index -= 1
      }

      result[_index] = result[_index] || []
      result[_index].push(e)
    })

    this.setData({ fm: result[0][0].url })
    return result
  },
  upload(evt) {

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera']
    }).then(res => {

      wx.showLoading({ title: '上传中...', mask: true })

      SERVER.addPic({
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: { id: this.data.id }
      }).then(res => {

        wx.hideLoading()
        wx.showToast({ title: '照片上传成功，请到后台管理系统中审核。', icon: 'none', duration: 2000 })

        this.getPic()
      }).catch(e => {
        wx.hideLoading()
        console.log(e)
      })
    })
  },
  previewImage(e) {

    let current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: [current]
    })
  }
})