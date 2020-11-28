const router = require('express').Router();


router.post("/login", (req, res) => {
    return res.status(501).send();
});

router.post("/register", (req, res) => {
    return res.status(501).send();
});

router.get("/logout", (req, res) => {
    return res.status(501).send();
});

module.exports = router;

//cookie set.
//localStorage.setItem("key", "value")
//cookie get
//localStorage.getItem("key")
//Hyppige cookies at gemme.
//brugernavn (eks. Hej Morten på hjemmesiden.)
//tokens