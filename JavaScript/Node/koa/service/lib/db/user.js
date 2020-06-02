const {
    User
} = require('./model')
const {
    encode,
    decode
} = require('../crypto')

const getByOpenId = async (openId) => {
    const users = await User.find({
        openId: openId
    })
    if (users.length) {
        return users[0]
    }
    return null
}

module.exports = {
    async login(openId) {
        let user = await getByOpenId(openId) //根据openId查用户
        if (user.length) {  //如果用户不存在则创建用户
            user = await User.create({
                openId: openId
            })
        }
        const id = user._id
        const sessionKey = encode(id) //根据用户ID 生成登录凭证
        await User.update({   //更新最后登录时间
            _id: id
        }, {
            lastLogin: Date.now()
        })
        return {    //返回置录凭证
            sessionKey
        }
    },
    async findBySessionKey(sessionKey) {
        const {
            id,
            timespan
        } = decode(sessionKey)   //解密凭证，得到用户ID 和时间戳
        // sessionKey expire 3d
        if (Date.now() - timespan > 1000 * 60 * 60 * 24 * 3) {  //默认超时时间为3 天
            return null  //凭证超时，返回“空”
        }
        const users = await User.find({   //根据用户ID 查询用户
            _id: id
        })
        if (users.length) {  //如果查询到用户，则返回用户
            return users[0]
        }
        return null
    }
}