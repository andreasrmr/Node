const express = require('express')
const app = express()
const rateLimiter = require("express-rate-limit");
const port = 8080
const fs = require('fs');
const path = require('path');

require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static('public'));

const authLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 6 // limit each IP to 6 requests per windowMs
});
app.use("/auth", authLimiter);
const authRoutes = require("./routes/auth.js");
app.use(authRoutes);

//TODO: const header = "mangler"
//TODO: const footer = "mangler"
// så kan man sende: return res.send(header + loginPage + footer);
const dirPath = path.join(__dirname, "/public/login.html")
const loginPage = fs.readFileSync(dirPath).toString();



//Login Page
app.get("/login", (req, res) => {
    return res.send(loginPage);
})
  
app.listen(port, (err) => {
    if(err) { throw err }
    console.log("Server started on port: ", Number(port));
})

