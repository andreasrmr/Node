const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express()
const port = 8081;

require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

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

//Store in db
let refreshTokens = []

//create new access token.
app.post('/auth/token', (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)){
        res.sendStatus(403)
    } 
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({accessToken : accessToken})
    })
})

//Login
app.post("/auth/login", async (req, res) => {
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
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            //STORE IN DB
            refreshTokens.push(refreshToken)
            res.json( { accessToken: accessToken, refreshToken: refreshToken })
        }
        else {
            res.status(500).send("Password incorrect")
        }
  
    } catch (err) {
        res.status(500).send("Something went wrong");
    }   
});

//Logout // DELETE token
app.delete('/auth/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204);
})


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
}

app.listen(port, (err) => {
    if(err) { throw err }
    console.log("Server started on port: ", Number(port));
})