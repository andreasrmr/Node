const express = require('express')
const app = express()
//const rateLimiter = require("express-rate-limit");
const port = 8080
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static('public'));

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

//rate limiting
//const authLimiter = rateLimiter({
//    windowMs: 10 * 60 * 1000, // 10 minutes
//    max: 6 // limit each IP to 6 requests per windowMs
//});
//app.use("/auth", authLimiter);
//const authRoutes = require("./routes/auth.js");
//app.use(authRoutes);

//TODO: const header = "mangler"
//TODO: const footer = "mangler"
// så kan man sende: return res.send(header + loginPage + footer);
const dirPath = path.join(__dirname, "/public/login.html")
const loginPage = fs.readFileSync(dirPath).toString();


//Login Page
app.get("/auth/login", (req, res) => {
    return res.send(loginPage);
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

app.get('/auth/posts', authenticateToken, (req, res) => {
    //only send posts for specific user
    res.json(posts.filter(post => post.username === req.user.name ));
})

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

};

//register
app.post("/auth/register", async (req, res) => {
    try {
        const plainTextPW = req.body.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainTextPW, saltRounds);
        await pool.execute('INSERT INTO users SET username = ?, password = ?', [req.body.username, hashedPassword]);
        res.send("User created");
    } catch (err) {
        res.status(500).send("Something went wrong, username already exists, password too long etc, db not running");
    }
});
  
app.listen(port, (err) => {
    if(err) { throw err }
    console.log("Server started on port: ", Number(port));
})

