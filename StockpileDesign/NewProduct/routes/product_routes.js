var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

//route for the product list
app.get('/', function(request, response) {
  // response.render('product', {title: 'Lab 9 - Integration using Node.js'})
  // TODO: Initialize the query variable with a SQL query
  // that returns all the rows and columns in the 'store' table
  var query = 'SELECT * FROM all_products';

  db.any(query)
    .then(function(rows) {
      // render views/store/list.ejs template file
      response.render('product_list', {
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
app.get('/(:id)', function(request, response) {
  // response.render('product', {title: 'Lab 9 - Integration using Node.js'})
  // TODO: Initialize the query variable with a SQL query
  // that returns all the rows and columns in the 'store' table
  var itemId = request.params.id;
  var query = 'SELECT * FROM all_products';
  var current_query = 'SELECT * FROM all_products WHERE id=' + itemId;

  db.multi('SELECT * FROM all_products;SELECT * FROM all_products WHERE id=' + itemId)
    .then(all_data => {
      console.log(all_data);
      response.render('product', {
        title: 'Store listing',
        data: all_data[0],
        individual_data: all_data[1][0],
        id: itemId
      })
    })
    .catch(err => {
      console.log("error getting db");
      // display error message in case an error
      request.flash('error', err);
      response.render('product', {
        title: 'Store listing',
        data: '',
        id: -1,
        individual_data: ''
      })
    });
  //
  // db.any(query)
  //   .then(function(rows) {
  //     // render views/store/list.ejs template file
  //     response.render('product', {
  //       title: 'Store listing',
  //       data: rows,
  //       id: itemId
  //     })
  //   })
  //   .catch(function(err) {
  //     console.log("error getting db");
  //     // display error message in case an error
  //     request.flash('error', err);
  //     response.render('product', {
  //       title: 'Store listing',
  //       data: '',
  //       id: -1
  //     })
  //   })
});
