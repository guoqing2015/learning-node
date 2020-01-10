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
})


// find 从collection中查找所有的匹配的数据
// findOne 查找第一条匹配的数据
UserModal.find({username: 'guoqing'}).then(function(res) {
    console.log(res)
})

