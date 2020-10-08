const express = require("express")
const app = express()

//http request get
app.get("/", (req, res) => {
    //send textfil.
    return res.send("text her")
    //send html fil
    //return res.sendFile(__dirname + "/index.html");
})

//hvis der er sat en env var port vil den tage den. ellers vil den bruge 80.
const port = process.env.PORT || 80

app.listen(port, (err) => {
    if(err) { throw err }
    console.log("Server started on port: ", Number(port));
})

