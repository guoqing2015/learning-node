const mongoose = require('mongoose')

const TodolistSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
})


const Todolist = mongoose.model('todolist', TodolistSchema)

module.exports =  Todolist;