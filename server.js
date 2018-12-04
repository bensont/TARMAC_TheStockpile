var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var expressValidator = require('express-validator');
app.use(expressValidator());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var morgan = require('morgan');
app.use(morgan('dev'));
var User = require('./routes/models/user');

var signup = require('./routes/signup');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var logout = require('./routes/logout');

var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({
    secret: 'csci3308',
    key: 'user_sid',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000}
}));
app.use(flash());

app.use('/login', login);
app.use('/signup', signup);
app.use('/dashboard', dashboard);
app.use('/logout', logout);

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

//so first we have to make
var index = require('./routes/index'); //maybe this is the home page
var storeUser = require('./routes/storeUser'); //list of users
var storeItems = require('./routes/storeItems'); //list of items
var storeRestock = require('./routes/storeRestock');//this is for listing items restock and working with that.
var storeOrders = require('./routes/storeOrders'); //list of orders
var productRoutes = require('./routes/product_routes');
var homeRoute = require('./routes/homeRoute');

app.use('/admin', index);
app.use('/admin/storeUser', storeUser);
app.use('/admin/storeItems', storeItems);
app.use('/admin/storeRestock', storeRestock);
app.use('/admin/storeOrders', storeOrders);
app.use('/product', productRoutes);
app.use('/', homeRoute);

app.use(express.static('./'));

//local
//var port = 4000;

//remote
var port = process.env.PORT;

app.listen(port, function () {
    console.log('Server running on http://localhost:' + port)

});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});
