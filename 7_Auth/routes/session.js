const session = require('express-session');

const router = require('express').Router();

router.get("/setSession", (req, res) => {
    return res.send({ data: "Session set" })
});

router.get("/getSession", (req, res) => {
    return res.send({ data: req.session.mySecret })
});

module.exports = router;

//cookieconsent
//https://www.osano.com/cookieconsent/download/