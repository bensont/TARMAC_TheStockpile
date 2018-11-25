var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.get('/', function (request, response) {

    // TODO: Initialize the query variable with a SQL query
    // that returns all the rows and columns in the 'store' table
    var query = 'SELECT * FROM products WHERE qty < 3;';

    db.any(query)
      .then(function (rows) {
          // render views/store/list.ejs template file
          response.render('restock/list', {
              title: 'List Items Needed to be Restocked',
              data: rows
          })
      })
      .catch(function (err) {
          // display error message in case an error
          request.flash('error', err);
          response.render('restock/list', {
              title: 'List Items Needed to be Restocked',
              data: ''
          })
      })
});