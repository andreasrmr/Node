const router = require('express').Router();
const path = require('path');

router.get('/frontpage', (req, res) => {
    //brug altid path bibliotek hvis vi skal "nyt sted hen med eks. ../"
    return res.sendFile(path.join(__dirname + '/../index.html'));
});

module.exports = router;

//cookieconsent
//https://www.osano.com/cookieconsent/download/