const photo = require('../lib/db/photo')
const album = require('../lib/db/album')

module.exports = {
  //某个相册的相片列表
  async getPhotos (userId, albumId, pageIndex, pageSize) {
    //获取照片数量，照片列表
    const [count, photos] = await Promise.all([photo.getPhotosCount(userId, albumId), photo.getPhotos(userId, albumId, pageIndex, pageSize)])
    return {
      count,
      data: photos
    }
  },
  //获取相册列表
  async getAlbums (userId, pageIndex, pageSize) {
    let albums, count
    if (pageSize) {
      //获取相册数量，相应页面的相册
      [count,albums] = await Promise.all([album.getAlbumsCount(userId), album.getAlbums(userId, pageIndex, pageSize)]) //同时查询出相册中的照片信息
    } else {
      albums = await album.getAlbums(userId)
    }
    //同时获取所有相册的照片
    let result = await Promise.all(albums.map(async function (item) {
      const id = item._id   //获取相册ID
      let ps = await photo.getPhotosByAlbumId(id)   //根据相册ID 读取照片列表
      return Object.assign({
        photoCount: ps.length,    //获取照片数
        fm: ps[0] ? ps[0].url : null    //默认取最近的数据作为封面
      }, item.toObject())    //item 为当前相册的数据 toObject:将Mongoose文档转换为普通对象
    }))
    if (count) {
      return {
        count,
        data: result
      }
    }
    return result
  },
  //添加相册
  async addAlbum(userId, name) {
    return album.add(userId, name)
  },
  //更新相册
  async updateAlbum(id, name, user) {
    const _album = await album.findById(id) //根据相册ID 查询相册
    if (!_album) {   //如果没有查到相册， 直接抛出异常
      throw new Error('修改的相册不存在')
    }
    if (!user.isAdmin && user.id !== _album.userId) {  //如果当前用户不是管理员、所有者则抛出无权限
      throw new Error('你没有权限修改此相册')
    }
    return album.update(id, name)
  },
  //根据id删除相册
  async deleteAlbum (id) {
    const photos = await photo.getPhotosByAlbumIdCount(id)  //获取相册下的照片数
    if (photos.length) {
      throw new Error('相册还存在相片，不允许删除') //如果相册下还存在照片
    }
    return album.delete(id)  //删除相册
  },
  async approve (id, state) {
    return photo.approve(id, state)
  },
  //修改照片信息
  async updatePhoto (id, data) {
    return photo.update(id, data)
  },
  //添加照片
  async add (userId, url, albumId) {
    return photo.add(userId, url, albumId)
  },
  //通过id获取照片
  async getPhotoById (id) {
    return photo.getPhotoById(id)
  },
  async delete (id) {
    return photo.delete(id)
  },
  //获取照片列表
  async getPhotosByType (type, pageIndex, pageSize) {
    let count, photos
    switch (type) {
      case 'pending':    //获取待审核照片列表
        [count, photos] = await Promise.all([photo.getApprovingPhotosCount(), photo.getApprovingPhotos(pageIndex, pageSize)])
        return {
          count,
          data: photos
        }
      case 'accepted':   //获取审核通过的照片列表
        [count, photos] = await Promise.all([photo.getApprovedPhotosCount(), photo.getApprovedPhotos(pageIndex, pageSize)])
        return {
          count,
          data: photos
        }
      case 'rejected':    //获取审核被拒绝的照片列表
        [count, photos] = await Promise.all([photo.getUnApprovedPhotosCount(), photo.getUnApprovedPhotos(pageIndex, pageSize)])
        return {
          count,
          data: photos
        }
      default:      //获取全部照片列表
        [count, photos] = await Promise.all([photo.getAllCount(), photo.getAll(pageIndex, pageSize)])
        return {
          count,
          data: photos
        }
    }
  }
}