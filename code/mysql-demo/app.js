const express = require('express')
const mysql = require('mysql')
const app = express();

app.use(function(req, res, next) {
    let start = new Date()
        next()
    let ms = new Date() - start
    console.log('%s %s - %s', req.method, req.url, ms)
})


// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodemysql'
})

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Mysql connected !')
})

app.get('/', (req, res) => {
    res.send('Hello');
})

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('Database created');
    })
});

// create table 
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts( id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id) )'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...')
    })
}) 

// insert post 
app.get('/addpost1', (req, res) => {
    let post = {title: 'post one', body: 'This is a post one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post1 add...')
    })
})

// select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts fetched...')
    })
})


// select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...')
    })
})



// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...')
    })
})

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post delete...')
    })
})

app.listen('3000', () => {
    console.log('Server start on port 3000');
})
