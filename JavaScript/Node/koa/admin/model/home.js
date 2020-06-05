// 定义数据结构
let menuData = [{
  title: '照片管理',
  icon: 'image',
  url: '/photos/all'
}, {
  title: '用户管理',
  icon: 'users',
  url: '/users/all'
}]

module.exports = {
  getMenu: function () {
    return menuData
  }
}
