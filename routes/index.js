var express = require('express');
var app = express();

app.get('/', function (request, response) {
   // render the views/index.ejs template file
   response.render('index', {title: 'Admin Website, ONlLY ADMINS ARE ALLOWED HERE'})
});

module.exports = app;