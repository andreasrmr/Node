const express = require("express");
const app = express();
//const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//app.use(cors())

//http request get
app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/index.html");
});

app.get("/installation", (req, res) => {
    return res.sendFile(__dirname + "/public/installation.html");
});

app.get("/projektoprettelse", (req, res) => {
    return res.sendFile(__dirname + "/public/projektoprettelse.html");
});

app.get("/topnav", (req, res) => {
    return res.sendFile(__dirname + "/public/topnav.html");
});


//hvis der er sat en env var port vil den tage den. ellers vil den bruge 80.
//const port = process.env.PORT || 80
//test
const port = 8080

app.listen(port, (err) => {
    if(err) { throw err }
    console.log("Server started on port: ", Number(port));
})

