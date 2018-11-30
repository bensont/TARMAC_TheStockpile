var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.get('/', function (request, response) {

    // TODO: Initialize the query variable with a SQL query
    // that returns all the rows and columns in the 'store' table
    var query = 'SELECT * FROM products WHERE stock < 3;';

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

app.get('/edit/(:productid)', function (request, response) {
    // Fetch the ProductID of the item from the request.
    var itemProductID = request.params.productid;

    // TODO: Initialize the query variable with a SQL query
    // that returns all columns of an item whose ProductID = itemProductID in the
    // 'store' table
    var query = 'SELECT * FROM products WHERE productid ='  + request.params.productid + ';';
    db.one(query)
        .then(function (row) {
            // if item not found
            if (row.length === 0) {
                request.flash('error', 'Item not found with ProductID = ' + request.params.productid);
                response.redirect('/restock')
            }
            else {
                response.render('restock/edit', {
                    title: 'Restock Product',
                    productid: row.productid,
                    stock: row.stock
                })
            }
        })
        .catch(function (err) {
            request.flash('error', err);
            response.render('restock/list', {
                title: 'Restock Product',
                data: ''
            })
        })
});


// Route to update values. Notice that request method is PUT here
app.put('/edit/(:productid)', function (req, res) {
    // ValProductIDate user input - ensure non emptiness
    req.assert('stock', 'Quantity is required').notEmpty();
    var itemProductID = req.params.produtid;

    var errors = req.validationErrors();
    if (!errors) { // No valProductIDation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            stock: req.sanitize('stock').escape().trim()
        };

        // TODO: Initialize the updateQuery variable with a SQL query
        // that updates the details of an item given its ProductID
        // in the 'store' table
        // Running SQL query to insert data into the store table
        //Update products SET stock = stock + (SELECT stock FROM product WHERE productid = req.params.productid);
        //'Update products SET stock = ' + "'" + item.stock + "' +(SELECT stock FROM products WHERE productid = " + req.params.prouductid + ');';
        /*
        UPDATE your_table
SET id = id + (SELECT MAX(id) FROM your_table)
        */
        //var updateQuery = 'UPDATE products SET stock = ' + "'" + item.stock + "' " + ' WHERE productid = ' + req.params.productid +';';
        var updateQuery = 'Update products SET stock = ' + item.stock + "+(SELECT stock FROM products WHERE productid = " + req.params.productid + ') WHERE productid = '+ req.params.productid +';';
        // Running SQL query to insert data into the store table
        db.none(updateQuery)
            .then(row => {
                req.flash('success', 'Data updated successfully!');
                res.redirect('/storeRestock');
            })
            .catch(function (err) {
                req.flash('error', err);
                res.render('restock/edit', {
                    title: 'Restock Product',
                    productid: row.productid,
                    stock: row.stock
                })
            })
    }
    else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        req.flash('error', error_msg);
        res.render('restock/edit', {
            title: 'Restock Product',
            stock: row.stock
        })
    }
});