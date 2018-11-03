var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.get('/', function (request, response) {
    // response.render('product', {title: 'Lab 9 - Integration using Node.js'})
    // TODO: Initialize the query variable with a SQL query
    // that returns all the rows and columns in the 'store' table
    var query = 'SELECT * FROM all_products';

    db.any(query)
      .then(function (rows) {
          // render views/store/list.ejs template file
          response.render('list', {
              title: 'Store listing',
              data: rows
          })
      })
      .catch(function (err) {
          console.log("error getting db");
          // display error message in case an error
          request.flash('error', err);
          response.render('list', {
              title: 'Store listing',
              data: ''
          })
      })
});
