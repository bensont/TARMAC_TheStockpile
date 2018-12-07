var express = require('express');
var app = express();
module.exports = app;
var User = require('./models/user');


app.route('/')
	.get((req, res) => {
	    if (req.session.user && req.cookies.user_sid) {  		
		        res.render('dashboard.ejs', {
		            title: 'Dashboard',
		            data: req.session.user,
		        })        
	    } else {
	        res.redirect('/login');
	    }
	})
	.post((req, res) => {
		User.update({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			streetaddress: req.body.streetaddress,
			city: req.body.city,
			state: req.body.state,
			zipcode: Number(req.body.zipcode),
			deliveryinstructions: req.body.deliveryinstructions
		},

		{where: {userid: req.session.user.userid}

		})
        .catch(error => {
        	console.log(error);
            res.redirect('/');
        });	
		req.session.user.firstname = req.body.firstname;
		req.session.user.lastname = req.body.lastname;
		req.session.user.email = req.body.email;
		req.session.user.streetaddress = req.body.streetaddress;
		req.session.user.city = req.body.city;
		req.session.user.state = req.body.state;
		req.session.user.zipcode = req.body.zipcode;
		req.session.user.deliveryinstructions = req.body.deliveryinstructions;
		res.redirect('/dashboard');	        	
	});