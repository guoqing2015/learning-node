const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/myblog");

mongoose.connection.once('open', function () {
    console.log('Connection has been made, now make fireworks...');
}).on('error', function (error) {
    console.log('Connection error:', error)
})

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    pages: Number
});

const AuthorSchema = new Schema({
    name: String,
    age: Number,
    books: [BookSchema]
});

const Author = mongoose.model('anthor', AuthorSchema)


cosnt pat = new Author({
    name: 'Patrick Rothfusls',
    books: [{title: 'Name of the Wind', pages: 400}]
})
