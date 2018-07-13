export default {
  // 获取图片src资源
  reSrc: (ele, type) => {
    for (let i = 0; i < ele.length; i++) {
      ele[i].img = require('../assets/' + ele[i].img + '.' + type)
    }
    return ele
  }
}
