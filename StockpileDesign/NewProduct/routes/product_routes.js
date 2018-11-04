var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

//default home route, responds with a list of all products
app.get('/', function(request, response) {
  // response.render('product', {title: 'Lab 9 - Integration using Node.js'})
  // TODO: Initialize the query variable with a SQL query
  // that returns all the rows and columns in the 'store' table
  var query = 'SELECT DISTINCT type FROM products_exact_copy';

  db.any(query)
    .then(function(rows) {
      // render views/store/list.ejs template file
      response.render('all_products_list.ejs', {
        title: 'Store listing',
        data: rows
      })
    })
    .catch(function(err) {
      console.log("error getting db");
      // display error message in case an error
      request.flash('error', err);
      response.render('product_list', {
        title: 'Store listing',
        data: ''
      })
    })
});

//route for a category page
//default home route, responds with a list of all products
app.get('/:category', function(request, response) {
  // response.render('product', {title: 'Lab 9 - Integration using Node.js'})
  // TODO: Initialize the query variable with a SQL query
  // that returns all the rows and columns in the 'store' table
  var itemCategory = request.params.category;
  var query = "SELECT * FROM products_exact_copy WHERE type='" + itemCategory + "'";

  db.any(query)
    .then(function(rows) {
      // render views/store/list.ejs template file
      response.render('product_list.ejs', {
        title: 'Store listing',
        data: rows
      })
    })
    .catch(function(err) {
      console.log("error getting db");
      // display error message in case an error
      request.flash('error', err);
      response.render('product_list', {
        title: 'Store listing',
        data: ''
      })
    })
});

//route for the individual product
app.get('/:category/:id', function(request, response) {
  // response.render('product', {title: 'Lab 9 - Integration using Node.js'})
  // TODO: Initialize the query variable with a SQL query
  // that returns all the rows and columns in the 'store' table
  var itemId = request.params.id;
  var query = 'SELECT * FROM products_exact_copy';
  var current_query = 'SELECT * FROM products_exact_copy WHERE id=' + itemId;

  db.multi(query + ';' + current_query)
    .then(all_data => {
      response.render('product', {
        title: 'Store listing',
        data: all_data[0],
        individual_data: all_data[1][0],
        id: itemId
      })
    })
    .catch(err => {
      console.log("error getting db for individual product");
      console.log(itemId, request.params.category);
      // display error message in case an error
      request.flash('error', err);
      response.render('product', {
        title: 'Store listing',
        data: '',
        id: -1,
        individual_data: ''
      })
    });
});
