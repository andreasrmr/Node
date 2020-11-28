const express = require('express');
const app = express();
app.use(express.json());

require("dotenv").config();

//https://www.npmjs.com/package/express-session
const session = require('express-session');
//session er et sted og gemme data. et "store".
//session gør at vi kan have data imellem alle vores routes.
//.env generate random key:  require('crypto').randomBytes(42).toString("hex");
//udskriv env variable
//console.log(process.env.SESSION_SECRET)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //vores app er ikke secure pga. vi ikke kører https. Derfor false.
    //søg på: express https for at finde ud af hvordan https sættes op. (Key + domæne skal sættes op.) 
    cookie: { secure: false }
}));


//routes er også en form for middleware.
const authRoutes = require("./routes/auth.js");
const pagesRoutes = require("./routes/pages.js");
const sessionRoutes = require("./routes/session.js");
app.use(authRoutes);
app.use(pagesRoutes);
app.use(sessionRoutes);


/*
//Her sætter man baseRoute som prefix før.
//app.use("/baseRoute", authRoute);
//middleware (Ligger imellem før callback i app.get("/"))
function greeting(req, res, next) {
    console.log("Wow, nice to see you", req.ip);
    next();
}

app.get("/", greeting, (req, res, next) => {
    console.log("Hit me the first route");
    //next virker ikke hvis der sendes et response.
    next();
});

app.get("/", (req, res) => {
    console.log("hit the second route")
    return res.send({ data: "This is the frontpage" });
});

app.get("/*", (req, res) => {
    //return res.sendStatus(501) 1 måde
    //anden måde bedre måde
    return res.status(501).send({ data: "Could not find the page" })

});

*/

app.listen(8080, (err) => {
    if(err) { throw err; };
    console.log("Server is running");
});

//next er den næste route som matcher

//Middleware eksistere i express
//nærmest et plugin system.
//Middleware ligger imellem request/response.

//Authentication er når en bruger logger på.
//Authorization checker om den bruger der loggede på faktisk er den samme.