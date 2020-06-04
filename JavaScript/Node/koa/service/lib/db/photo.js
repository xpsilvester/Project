const {
  Phopto
} = require('./model')

module.exports = {
  //添加照片
  async add (userId, url, albumId) {
    let _photo = await Phopto.create({
      userId,
      url,
      albumId
    })
    return _photo
  },
  //更新照片
  async update (id, photo) {
    return Phopto.update({
      _id: id
    }, photo)
  },
  //审核照片
  async approve (id, state) {
    return Phopto.update({
      _id: id
    }, {
      isApproved: state || true
    })
  },
  //删除照片
  async delete (id) {
    return Phopto.update({
      _id: id
    }, {
      isDelete: true
    })
  },
  //根据userid和albumId获取照片列表
  async getPhotos (userId, albumId, pageIndex, pageSize) {
    let result
    if (pageSize) {
      result = await Phopto.find({
        userId,
        albumId,
        isApproved: true,
        isDelete: false
      }).sort({
        'created': -1
      }).skip((pageIndex - 1) * pageSize).limit(pageSize)
    } else {
      result = result = await Phopto.find({
        userId,
        albumId,
        isApproved: true,
        isDelete: false
      }).sort({
        'created': -1
      })
    }
    return result
  },
  //根据userid和albumId获取照片数量
  async getPhotosCount (userId, albumId) {
    return Phopto.count({
      userId,
      albumId,
      isApproved: true,
      isDelete: false
    })
  },
  //根据相册ID 读取照片列表
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
      }).sort({    //按更新时间倒序
        'updated': -1
      })
    }
    return result
  },
  //通过id获取相册中的照片数量
  async getPhotosByAlbumIdCount (albumId) {
    return Phopto.count({
      albumId,
      isApproved: true,
      isDelete: false
    })
  },
  //分页获取待审核照片列表
  async getApprovingPhotos (pageIndex, pageSize) {   
    return Phopto.find({
      isApproved: null,    //通过isApproved 字段为null 来获取
      isDelete: false      //过滤掉删除掉的数据
    }).skip((pageIndex - 1) * pageSize).limit(pageSize)
  },
  //获取待审核照片的数量
  async getApprovingPhotosCount () {   
    return Phopto.count({    //此处的过滤条件和获取数据的相同
      isApproved: null,
      isDelete: false
    })
  },
  //分页获取全部图片
  async getAll (pageIndex, pageSize) {
    return Phopto.find({
      isDelete: false
    }).skip((pageIndex - 1) * pageSize).limit(pageSize)
  },
  //获取全部图片数量
  async getAllCount () {
    return Phopto.count({
      isDelete: false
    })
  },
  //分页获取已审核照片列表
  async getApprovedPhotos (pageIndex, pageSize) {  
    return Phopto.find({ 
      isApproved: true,
      isDelete: false
    }).skip((pageIndex - 1) * pageSize).limit(pageSize)
  },
  //获取已审核照片数量
  async getApprovedPhotosCount () {
    return Phopto.count({
      isApproved: true,
      isDelete: false
    })
  },
  //分页获取被拒绝照片列表
  async getUnApprovedPhotos (pageIndex, pageSize) {   
    return Phopto.find({
      isApproved: false,
      isDelete: false
    }).skip((pageIndex - 1) * pageSize).limit(pageSize)
  },
  //获取被拒绝照片数量
  async getUnApprovedPhotosCount () {
    return Phopto.count({
      isApproved: false,
      isDelete: false
    })
  },
  //通过id获取照片
  async getPhotoById (id) {
    return Phopto.findById(id)
  }
}