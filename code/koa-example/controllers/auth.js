const User = require('../models/user')
const base = require('../models/base')
/**
 * 登陆
 */
exports.signIn = async (ctx) => {
    const { username, password } = ctx.request.body

    try {
        const user = await User.findByName(username)
        if (!user) {
            ctx.body = { 
                code: 424, 
                message: '用户不存在', 
            }
            return;
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            // ctx.throw(423, '用户名或密码错误')
                ctx.body = { 
                    code: 423, 
                    message: '用户名或密码错误', 
                }
                return;
        }
        const token = base.signToke(user)
    
        ctx.body = { 
          code: 200, 
          message: '登录成功!', 
          token: token
        }
    } catch (e) {
        ctx.throw(e)
    }
}

/**
 * 注册
 * @param {*} ctx 
 */
exports.createUser = async (ctx) => {
    const {
        username,
        password
    } = ctx.request.body

    if (!ctx.request.body) {
        ctx.throw("The body is empty", 400)
    }

    if (!username) {
        ctx.throw("Missing username", 400)
    }

    if (!password) {
        ctx.throw("Missing username", 400)
    }


    try {
        const user = new User({
            user_name: username,
            password: password
        })
        await user.save();
        // await this.login(user)
    } catch (err) {
        ctx.throw(err)
    }

    // ctx.response.body = {        code: 200, message: '注册成功！'}
    ctx.body = {
        code: 200,
        message: '注册成功！'
    }

}

/**
 * 获取用户信息
 */

 exports.getUsrInfo = async (ctx) => {
    const user = await base.checkToken(ctx, User, true)
    ctx.body = {
      code: 200,
      message: '获取用户信息成功！',
      userName: user.user_name,
      token: base.signToke(user)
    }
    
 }