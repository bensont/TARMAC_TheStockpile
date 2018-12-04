var express = require('express');
var app = express();
var User = require('./models/user');

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

app.route('/')
    .get(sessionChecker, (req, res) => {
         res.render('signup.ejs', {
            title: 'Signup'
        })
    })
    .post((req, res) => {
        User.create({
            email: req.body.email,
            password: req.body.pass,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            permissionslevel: 'customer',
            streetaddress: ' ',
            city: ' ',
            state: ' ',
            zipcode: '0',
            deliveryinstructions: ' ',
        })
        .then(user => {
            req.session.user = user.dataValues;
            req.sessioncookie.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
        	console.log(error);
            res.redirect('/signup');
        });
    });
    
module.exports = app;    