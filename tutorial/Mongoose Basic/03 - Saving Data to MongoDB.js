const mongoose = require('mongoose')

// collect to mongodb
mongoose.connect("mongodb://localhost:27017/myblog");

mongoose.connection.once('open', function () {
    console.log('Connection has been made, now make fireworks...');
}).on('error', function (error) {
    console.log('Connection error:', error)
})


const Schema = mongoose.Schema;

// Create Schema and Model
const UserSchema = new Schema({
    username: String,
    age: Number
});

const UserModal = mongoose.model('users', UserSchema);

const user = new UserModal({
    username: 'guoqing',
});

user.save().then(function() {
    console.log(user)
    console.log(user.isNew)
});
