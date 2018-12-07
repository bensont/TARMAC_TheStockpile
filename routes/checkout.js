var express = require('express');
var app = express();
var User = require('./models/user');
var Order = require('./models/order');
var OrderProduct = require('./models/orderproduct');

var sessionChecker = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/login'); 
    } else {
        next();
    }
}; 

app.route('/')
    .get(sessionChecker, (req, res) => {
         res.render('checkout.ejs', {
            title: 'Checkout',
            data: req.session.user
        })
    })
    .post((req, res) => {
        var json_cart = JSON.parse(req.body.cartitems);
        Order.max('orderid').then(max => {
            for (i in json_cart) {
                OrderProduct.create({
                    products_productid: json_cart[i][4],
                    orders_orderid: max+1,
                    quantity: json_cart[i][3],
                    cost: json_cart[i][2],
                    discountcost: 0,
                    users_userid: req.session.user.userid  
                })                          
            }   
        })   
        Order.create({
            userid: Number(req.body.userid),
            totalcost: Number(req.body.totalcost),
            discounts: Number(req.body.discounts),
            status: req.body.status,
            totalquantity: Number(req.body.totalquantity),
            userorderproduct_userid: Number(req.body.userid)
        })
        .then(() => {         
            res.redirect('/checkout/ordercomplete');
        })
        .catch(error => {
            console.log(error);
            res.redirect('/product/cart');
        });
    }); 

app.route('/ordercomplete')
    .get((req,res) => {
        res.render('ordercomplete.ejs', {
            title: 'Order Complete'
        })
    })        

module.exports = app;  