const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',  (req, res) => {
    res.json({
        message: 'welcome to this api'
    })
})

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created...',
                authData
            })

        }
    })
})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1, 
        username: 'brad',
        email: 'brad@gmail.com',
    };
    jwt.sign({ user }, 'secretkey', /* {expiresIn: '60s'}, */ (err, token) => {
        res.json({
            token
        })
    })
})


// FORMAT OF TOKEN
// Authorization : Bearer </access_token>

// Verfiy token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    } else {
        // Forbidden
        res.sendStatus(403)
    }
}
app.listen(5000, () => console.log('Server started on port 5000'))