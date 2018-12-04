var express = require('express');
var app = express();
var User = require('./models/user');
module.exports = app;

var sessionChecker = (req, res, next) => {
	console.log(req.cookies);
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

app.route('/')
    .get(sessionChecker, (req, res) => {
        res.render('login.ejs', {
            title: 'Login'
        })
    })
    .post((req, res) => {
        var email = req.body.email,
            password = req.body.password;

        User.findOne({ where: { email: email } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });
    
    