const mongoose = require('mongoose')

// collect to mongodb
mongoose.connect("mongodb://localhost:27017/myblog");

mongoose.connection.once('open', function () {
    console.log('Connection has been made, now make fireworks...');
}).on('error', function (error) {
    console.log('Connection error:', error)
})