var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

//default home route, responds with a list of all products
app.get('/', function(request, response) {
  // response.render('product', {title: 'Lab 9 - Integration using Node.js'})
  // TODO: Initialize the query variable with a SQL query
  // that returns all the rows and columns in the 'store' table
  var query = 'SELECT DISTINCT type FROM products';
  var chair_image_query = 'SELECT Image FROM products WHERE Type = \'Chair\'';
  var table_image_query = 'SELECT Image FROM products WHERE Type = \'Table\'';
  var dresser_image_query = 'SELECT Image FROM products WHERE Type = \'Dresser\'';
  var mirror_image_query = 'SELECT Image FROM products WHERE Type = \'Mirror\'';
  var lighting_image_query = 'SELECT Image FROM products WHERE Type = \'Lighting\'';

  db.multi(query + ';' + chair_image_query + ";" + table_image_query + ";" + dresser_image_query + ";" + mirror_image_query + ";" + lighting_image_query)
    .then(all_data => {
      console.log({ 'Chair': all_data[1],
                    'Table': all_data[2],
                    'Dresser': all_data[3],
                    'Mirror': all_data[4],
                    'Lighting': all_data[5]},
    });
      response.render('all_products_list.ejs', {
        title: 'Store listing',
        data: all_data[0],
        image_data: { 'Chair': all_data[1],
                      'Table': all_data[2],
                      'Dresser': all_data[3],
                      'Mirror': all_data[4],
                      'Lighting': all_data[5]},
      })
    })
    .catch(function(err) {
      console.log("error getting db");
      // display error message in case an error
      request.flash('error', err);
      response.render('product_list', {
        title: 'Store listing',
        data: '',
        image_data: ''
      })
    });
});
