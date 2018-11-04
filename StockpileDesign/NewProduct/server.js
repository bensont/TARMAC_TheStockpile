//initialize express and set view to ejs
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

//boilerplate code that is required to set-up url-encoding, sessions, cookies and flash messages for you webapp
var expressValidator = require('express-validator');
app.use(expressValidator());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var methodOverride = require('method-override');
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method
  }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('csci3308'));
app.use(session({
  secret: 'csci3308',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());

//routes
var chair_list = require('./routes/product_routes');
//var store = require('./routes/store');
app.use('/', chair_list);
app.use(express.static('./'));
// app.use(express.static('Database_Images'));

//app.use('/store', store);

//start server on port 4000
var port = 4000;
app.listen(port, function() {
  console.log('Server running on http://localhost:' + port)
});
