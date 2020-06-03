const {
  Phopto
} = require('./model')

module.exports = {
  async getPhotosByAlbumIdCount(albumId) {
    return Phopto.count({
      albumId,
      isApproved: true,
      isDelete: false
    })
  },
  async getPhotosByAlbumId (albumId, pageIndex, pageSize) {
    let result
    if (pageSize) {
      result = await Phopto.find({
        albumId,
        isApproved: true,
        isDelete: false
      }).skip((pageIndex - 1) * pageSize).limit(pageSize)
    } else {
      result = await Phopto.find({
        albumId,
        isApproved: true,
        isDelete: false
      }).sort({
        'updated': -1   //按照更新时间倒序排列
      })
    }
    return result
  },
  async add (userId, url, albumId) {
    let _photo = await Phopto.create({
      userId,
      url,
      albumId
    })
    return _photo
  },
  async getPhotoById (id) {
    return Phopto.findById(id)
  },
  async delete (id) {
    return Phopto.update({
      _id: id
    }, {
      isDelete: true
    })
  }
}