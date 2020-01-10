const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Schema and Model

const UserSchema = new Schema({
    username: String,
    age: Number
});

const UserModal = mongoose.model('users', UserSchema);

module.exports = UserModal;
