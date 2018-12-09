var express = require('express');
var app = express();
var User = require('./models/user');

var sessionChecker = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/');
    } else {
        User.findOne({ where: { userid: req.session.user.userid } }).then(function (user) {
            if (!user) {
                res.redirect('/');
            } else if (!user.isAdmin(User.permissionslevel)) {
                res.redirect('/login');
            } else {
            	next();
            }
        });    	
    }    
};

app.route('/')
    .get(sessionChecker, (req, res) => {
        res.render('index', {
            title: 'Admin Page'
        })
    })

module.exports = app;