let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');

let LocalAuthModel = require('../models/localAuths');
let checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function (req, res) {
    res.render('login');
});

router.post('/', checkNotLogin, function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    LocalAuthModel.getLocalAuthByUsername(username)
        .then(function (localAuth) {
            if (!localAuth) {
                req.flash('error', 'username does not exist');
                return res.redirect('back');
            }
            //bcrypt check hash in mode async
            bcrypt.compare(password, localAuth.password)
                .then(function (result) {
                    if (result === false) {
                        req.flash('error', 'password is wrong');
                        return res.redirect('back');
                    }
                    req.session.user = localAuth.user_id;
                    req.flash('success', 'log in succeed');

                    res.redirect('index');
                });

        });
});

router.get('/github', function (req, res) {
    res.redirect('http://github.com')
});

module.exports = router;