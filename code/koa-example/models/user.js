const mongoose = require('mongoose')
const config = require('../config/config')
const bcrypt = require('bcrypt')
const saltRounds = 10
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    app_secret: {
        type: String,
        default: GetHmac()
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    }
})

function GetHmac(){
    const hmac = crypto.createHmac('sha256', config.secret_key)
    hmac.update(Date.now().toString())
    return hmac.digest('hex')
}

UserSchema.pre('save', async function(next){
    try{
        const user = this
        if(!user.isModified('password')) return next()
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(this.password, salt)
        user.password = hash
        return next()
    }catch(e){
        return next(e)
    }
})

UserSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

UserSchema.statics.checkToken = async function(token){
    const secret = GetHmac()
    //console.log('secret', secret)

    // try {
    //     decoded = jwt.verify(token, secret);
    // } catch (e) {
    //     throw new Error('token验证未通过！')
    //     // return res.status(401).send('unauthorized');
    // }

    const user = await this.findOneAndUpdate({ _id: token.id }, { app_secret: secret })
    if(token.secret == user.app_secret){
        user.app_secret = secret
        //console.log('user user: ', user)
        return user
    }else{
        throw new Error('token验证未通过！')
    }
}

UserSchema.statics.findByName = async function(username){
    const user = await this.findOne({ 
        user_name: username
    })
    return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User
