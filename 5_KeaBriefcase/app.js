const express = require('express');
const app = express();
app.use(express.static('public'))

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/upload/upload.html");
});



const port = process.env.PORT || 80
app.listen(port, (err) => {
    if(err) throw err;
    console.log("Server started on port:", Number(port));  
});
