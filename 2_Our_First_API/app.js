//importer pakke
const express = require("express");
const app = express()
const port = 8080
const fetch = require("node-fetch")

//gør at vi kan sende body med POST.
//se evt. body-parser i npmjs 
app.use(express.json());

//forms
app.use(express.urlencoded({extended: true}));



//req = request, res = response.
app.get("/", (req, res) => {
    return res.send("<h1>Hello</h1");
});

//server side redirect
app.get("/greeting", (req, res) => {
    return res.redirect("/");
});

//proxy
app.get("/proxy", (req, res) => {
    fetch("https://google.com")
    .then(result => result.textConverted())
    .then(body => {
        return res.send(body)
    })
});

app.get("/catfacts", (req, res) => {
    return res.sendFile(__dirname + "/catfacts.html");
})

app.get("/documentation", (req, res) => {
    return res.sendFile(__dirname + "/documentation.html");
});

app.get("/documentation2", (req, res) => {
    return res.sendFile(__dirname + "/documentation2.html");
});

app.get("/me", (req, res) => {
    return res.send({ "Navn":"Andreas",
                      "By": "København",
                      "Test":"123"
    });
});

app.get("/time", (req, res) => {
    const date = new Date();
    //key = value
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    res.send({time});
});


const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

app.get("/months", (req, res) => {
    const date = new Date();
    const month = date.getMonth();
    res.send({month: months[month]});
});

const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

app.get("/day", (req, res) => {
    const date = new Date();
    const day = date.getDay();
    res.send({day: days[day]});
});

app.get("/querystring", (req, res) => {
    console.log(req.query);
    return res.send({query: req.query});
})

//http://localhost:8080/message/noget%20specifikt?queryString=hello
app.get("/message/:personalMessage", (req, res) => {
    return res.send({ message: req.params.personalMessage,
                    aKey: req.query});
})

app.post("/showMeTheBody", (req, res) => {
    console.log(req.body);
    return res.send(req.body);
});

app.listen(port, (error) => {
    if(error){
        console.log("Error starting the server");
    }
    console.log("Server is running on port", port)
});

