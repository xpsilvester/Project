let page = {
  qrcode: document.getElementById('j_qrcode'),
  renew: document.getElementById('j_renew'),
  warning: document.getElementById('j_warning'),
  codeContainer: document.getElementById('j_container')
}

// 二维码
let code = {
  init: function (data) {
    return new QRCode(page.qrcode, {
      text: data,
      width: 150,
      height: 150,
      colorDark: '#000000',
      colorLight: '#ffffff'
    })
  },
  renew: function (qrcode, data) {
    qrcode.makeCode(data)
  }
}

// 轮询接口(获取token + 使用token换取用户信息)
function interval (qrcode) {
  send('GET', null, `/token?code=${qrcode}`, function (data) {
    let _data = JSON.parse(data)
    if (_data.status === 0) {
      send('GET', null, `/check`, function (data) {
        let _data = JSON.parse(data)
        if (_data.data.isAdmin) {
          window.location.href = '/photos/all'
        } else {
          addClass(page.warning, 'login-warning')
        }
      })
    } else {
      interval(qrcode)
    }
  })
}

window.onload = function () {
  let qrcode

  // 初始化页面
  addClass(page.codeContainer, 'code-container-display')
  addClass(page.qrcode, 'qrcode-display')
  send('GET', null, '/qrcode', function (data) {
    qrcode = code.init(data)
    // 判断二维码是否过期
    count(29, function () {
      addClass(page.renew, 'renew-code-display')
    })
    // 轮询接口
    interval(data)
  })

  // 事件绑定：点击重新获取二维码
  page.renew.addEventListener('click', function () {
    removeClass(this, 'renew-code-display')
    send('GET', null, '/qrcode', function (data) {
      code.renew(qrcode, data)
      // 判断二维码是否过期
      count(29, function () {
        addClass(page.renew, 'renew-code-display')
      })
      // 轮询接口
      interval(data)
    })
  })
}
