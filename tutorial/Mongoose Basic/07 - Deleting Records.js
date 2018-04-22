const UserSchema = new Schema({
    username: String,
    age: Number
});

const UserModal = mongoose.model('users', UserSchema);

const user = new UserModal({
    username: 'guoqing',
});


user.remove();
userModal.remove();
userModal.findOneAndRemove();
