require('dotenv').config()
const express = require("express")
const app = express()

//JWT Explained 
//https://youtu.be/7Q17ubqLfaM
//Authenticate User
//https://youtu.be/Ud5xKCYQTjM
//Implementation af JWT
    //https://www.youtube.com/watch?reload=9&v=mbsmsi7l3r4

//AuthServer 
//Står for Login/Logout/Refresh Tokens

const jwt = require("jsonwebtoken")

app.use(express.json())

//normalt i prodvil man opbevare refreshtokens i en database eller andet
let refreshTokens = []

app.post("/token", (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) { return res.sendStatus(401) }
    if(!refreshTokens.includes(refreshToken)) { return res.sendStatus(403) }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) { return res.sendStatus(403) }
        const accessToken = generateAccessToken( { name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post("/login", (req, res) => {
    console.log(process.env.ACCESS_TOKEN_SECRET)
    //Authenticate User
    //https://youtu.be/Ud5xKCYQTjM
    //Se separat video

    //Implementation af JWT
    //https://www.youtube.com/watch?reload=9&v=mbsmsi7l3r4
    const username = req.body.username

    const user = { name: username }

    //access.token.secret defineret i .env fil.
    //nøglerne er generet med kommando i REPL mode: require('crypto').randomBytes(64).toString('hex')
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken : accessToken, refreshToken : refreshToken})
})
function generateAccessToken(user) {
    //expiresIn sættes til 15 secs for testing. /10 15 eller 30 min er mere normalt.
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
}

app.listen(8081, (err) => {
    if(err) {throw err}
    console.log("server started with no errors")
});