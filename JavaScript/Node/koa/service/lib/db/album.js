const {
  Album
} = require('./model')

module.exports = {
  //添加相册
  async add (userId, name) {
    return Album.create({
      userId,
      name
    })
  },
  //删除相册
  async delete (id) {
    return Album.deleteOne({
      _id: id
    })
  },
  //更新相册
  async update (id, name) {
    return Album.update({
      _id: id
    }, {
      name: name
    })
  },
  //根据id查找相册
  async findById(id){
    return Album.findById(id)
  },
  //获取用户相应页面的相册
  async getAlbums (userId, pageIndex, pageSize) {
    let result
    if (pageSize) {
      result = await Album.find({
        userId
      }).skip((pageIndex - 1) * pageSize).limit(pageSize)
    } else {
      result = await Album.find({
        userId
      }).sort({
        'updated': -1   //按时间倒序排列
      })
    }
    return result
  },
  //获取用户相册
  async getAlbumsCount (userId) {
    return Album.count({
      userId
    })
  }
}