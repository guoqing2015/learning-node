module.exports = {
    port: '8000',
    jwt_secret: 'xxxxxxxxxx',
    secret_key: 'xxxxxxxxxx',
    mongodb: 'mongodb://localhost:27017/myblog',
    getErr: function(e){
      console.log(e)
      e.code = e.code || 500
      switch(e.code){
        case 11000:
          e.message = '用户名已经存在！'
      }
      return {
        code: e.code,
        message: e.message
      }
    }
  }