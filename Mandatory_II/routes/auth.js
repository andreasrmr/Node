const router = require('express').Router();
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const path = require('path');
const jwt = require('jsonwebtoken');
const express = require('express');

require('dotenv').config();

router.use(express.json())

const pool = mysql.createPool({
    host     :  process.env.DB_HOST,
    user     :  process.env.DB_USER,
    password :  process.env.DB_SECRET,
    database :  process.env.DB_DBNAME,
    port     :  process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0   
});

//register
router.post("/auth/register", async (req, res) => {
    try {
        const plainTextPW = req.body.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainTextPW, saltRounds);
        await pool.execute('INSERT INTO users SET username = ?, password = ?', [req.body.username, hashedPassword]);
        res.send("User created");
    } catch (err) {
        res.status(500).send("Something went wrong, username already exists, password too long etc, db not running");
    }
})

//JWT test
const posts = [
    {
        username: 'andreasrmr',
        title: 'Post1'
    },
    {
        username: 'Jim',
        title: 'Post2'
    }
]

router.get('/auth/posts', authenticateToken, (req, res) => {
    //only send posts for specific user
    res.json(posts.filter(post => post.username === req.user.name ));
})


//Login
router.post("/auth/login", async (req, res) => {
    
        const username = req.body.username;
        const result = await pool.execute('SELECT password FROM users WHERE username = ?',  [username] );
        //check if result is undefined or no result
        if(result[0][0] === undefined || result[0][0].length == 0){
            res.status(403).send("Username incorrect");
        }
        try {
            const hashedPassword = result[0][0].password
            if(await bcrypt.compare(req.body.password, hashedPassword)){
                //authenticated here. // pw correct
                
                //JWT create and give access token
                const user = { name: username }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                res.json( { accessToken: accessToken })

                //const dirPath = path.join(__dirname, "../public/loggedIn.html")
                //res.sendFile(dirPath)
            }
            else {
                res.status(500).send("Password incorrect")
            }
      
        } catch (err) {
            res.status(500).send("Something went wrong");
        }   
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    //if we have an auth header return auth header token portion. otherwise return undefined
    //Bearer TOKEN (splittes)
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })

}

//Logout?

module.exports = router;

/*

Andet - test med mere.
router.put("/user", async (req, res) => {
    try {
        const result = await pool.execute('UPDATE users SET username = ?, password = ?', [req.body.username, req.body.password]);
    } catch (err) {
        console.log(err);
    }
})
*/

/*
router.delete("/user", async (req, res) => {
    try {
        const result = await pool.execute('DELETE FROM users WHERE id = ?', [req.body.id]);
        if(result[0].affectedRows == 1) {
            res.sendStatus(200);
        }
        else {
            res.status(500).send("user could not be found")
        }
    } catch (err) {
        res.send(err);
    }
})
*/

/*
Brugt til test.
//modtag alle brugere i db (skal nok slettes?)
router.get("/auth/user", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.send(result[0])
    } catch (err) {
        console.log(err);
    }
});
*/

