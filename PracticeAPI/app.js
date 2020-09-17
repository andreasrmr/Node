const express = require('express')
const app = express()
const port = 8080

app.get("/", (req, res) => {
    return res.sendFile("./index.html", {root: __dirname})
});

app.get("/hello2", (req, res) => {
    return res.send("Hello2");
});


app.listen(port, (error) => {
    if(error){
        console.log("something went wrong")
    }
    console.log(`Server is running on ${port}`) 
});

