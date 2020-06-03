const photo = require('../lib/db/photo')
const album = require('../lib/db/album')

module.exports = {
  async getAlbums (userId, pageIndex, pageSize) {
    let albums, count
    if (pageSize) {
      [albums, count] = await Promise.all([album.getAlbumsCount(userId), album.getAlbums(userId, pageIndex, pageSize)]) //同时查询出相册中的照片信息
    } else {
      albums = await album.getAlbums(userId)
    }
    let result = await Promise.all(albums.map(async function (item) {
      const id = item._id   //获取相册ID
      let ps = await photo.getPhotosByAlbumId(id)   //根据相册ID 读取照片列表
      return Object.assign({
        photoCount: ps.length,    //获取照片数
        fm: ps[0] ? ps[0].url : null    //默认取最近的数据作为封面
      }, item.toObject())    //item 为当前相册的数据
    }))
    if (count) {
      return {
        count,
        data: result
      }
    }
    return result
  },
  async addAlbum(userId, name) {
    return album.add(userId, name)
  },
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
  async deleteAlbum (id) {
    const photos = await photo.getPhotosByAlbumIdCount(id)  //获取相册下的照片数
    if (photos.length) {
      throw new Error('相册还存在相片，不允许删除') //如果相册下还存在照片
    }
    return album.delete(id)  //删除相册
  },
  async add (userId, url, albumId) {
    return photo.add(userId, url, albumId)
  },
  async getPhotoById (id) {
    return photo.getPhotoById(id)
  },
  async delete (id) {
    return photo.delete(id)
  }
}