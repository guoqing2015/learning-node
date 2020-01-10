const jwt = require('jsonwebtoken')
const config = require('../config/config')

//生成token
function signToke(user) {
    const token = jwt.sign({
        id: user._id,
        secret: user.app_secret
    }, config.jwt_secret, {
        expiresIn: 3600
    })
    return token
}

//检查并更新token
async function checkToken(ctx, User, getUser) {
    const token = ctx.state.user // 获取jwt 

    if (ctx.headers && ctx.headers.authorization) {
        const token = ctx.headers.authorization;

        const user = await User.checkToken(token)
        if (user) {
            return user;
           his.signToke(user)
            // } // if (getUser) {
            //     return user
            // } else {
            //     return t
        } else {
            ctx.throw(501, 'token信息异常')
        }
    }
    return res.send(500);



    // if (req.headers && req.headers.authorization) {
    //     var authorization = headers.authorization,
    //         decoded;
    //     try {

    //         decoded = jwt.verify(authorization, secret.secretToken);
    //     } catch (e) {
    //         return res.status(401).send('unauthorized');
    //     }
    //     var userId = decoded.id;
    //     // Fetch the user by id 
    //     User.findOne({
    //         _id: userId
    //     }).then(function (user) {
    //         // Do something with the user
    //         return res.send(200);
    //     });
    // }
    // return res.send(500);


}

module.exports = {
    signToke: signToke,
    checkToken: checkToken
}