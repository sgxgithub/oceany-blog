var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('cfd', {
        title: "OCEANY"
    });
});

module.exports = router;