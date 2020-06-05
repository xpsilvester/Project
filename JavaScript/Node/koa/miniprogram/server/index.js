const HOST = 'http://localhost:4001'
const SESSION_KEY = 'sessionKey'
const SERVER_API = {
  ALBUM: '/album',
  LOGIN: '/login',
  PHOTO: '/photo',
  USER: '/user',
  MY: '/my'
}

const HTTP = (url, option = {}, fn = 'request') => {
  let sessionKey = ''
  try {
    sessionKey = wx.getStorageSync(SESSION_KEY)
  } catch (e) {
    console.log(`[request请求获取登录态失败]，${JSON.stringify(e)}`)
  }
  return new Promise((resolve, reject) => {

    wx[fn]({
      ...option,
      url: HOST + url,
      header: {
        'x-session': sessionKey
      }
    }).then(res => {

      if (res.data.status == -1 && res.data.code == 401) {

        wx.showToast({ title: '登陆状态失效，请重新登录', icon: 'none', mask: true, duration: 2000 })

        reject(res)

      } else if (res.data.status == '-1') {

        wx.showToast({ title: res.data.message || '网络接口错误', icon: 'none', mask: true, duration: 2000 })

        reject(res)

      } else {
        resolve(res)
      }
    }).catch(e => {

      wx.showToast({ title: '错误提示：网络异常', icon: 'none', mask: true, duration: 2000 })

      reject(e)
    })
  })
}

const SERVER = {
  SESSION_KEY,
  HOST,
  FM: '../../assets/fengmian.png',
  getPics() {
    return HTTP(`/xcx${SERVER_API.ALBUM}`)
  },
  addPics(name) {
    return HTTP(SERVER_API.ALBUM, { method: 'post', data: { name } })
  },
  addPic(opt) {
    return HTTP(SERVER_API.PHOTO, opt, 'uploadFile')
  },
  getPic(id) {
    return HTTP(`/xcx${SERVER_API.ALBUM}/${id}`)
  },
  scanCode(code) {
    return HTTP(`/login/ercode/${code}`)
  },
  updateUserInfo(data) {
    return HTTP(`${SERVER_API.USER}`, { method: 'put', data })
  },
  getCurrentUserInfo() {
    return HTTP(`${SERVER_API.MY}`, { method: 'get' })
  },
  login(code) {
    return HTTP(SERVER_API.LOGIN, { data: { code: code } })
  }
}
module.exports = SERVER