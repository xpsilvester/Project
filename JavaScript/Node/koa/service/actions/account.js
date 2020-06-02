const {
    login,
    update,
    updateUserType,
    getUsersByType,
    getUsersCountByType,
    getUsers,
    getUsersCount

} = require('../lib/db/user')
const {
    add, updateSessionKey, getSessionKey, removeData
} = require('../lib/db/code')
const {
    getSession
} = require('../lib/wx')
const {
    encodeErCode,
    decode
} = require('../lib/crypto')

module.exports = {
    async login (code) {
        const session = await getSession(code)
        if (session) {  //如果未从微信接口获取到数据，则登录失败
            const {
                openid
            } = session
            return login(openid)
        } else {
            throw new Error('登陆失败')
        }
    }
}