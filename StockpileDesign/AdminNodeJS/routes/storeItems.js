var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.get('/', function (request, response) {

    // TODO: Initialize the query variable with a SQL query
    // that returns all the rows and columns in the 'store' table
    var query = 'SELECT * FROM products;';

    db.any(query)
      .then(function (rows) {
          // render views/store/list.ejs template file
          response.render('products/list', {
              title: 'Store listing',
              data: rows
          })
      })
      .catch(function (err) {
          // display error message in case an error
          request.flash('error', err);
          response.render('products/list', {
              title: 'Store listing',
              data: ''
          })
      })
});

app.get('/addItem', function (request, response) {
    // render views/store/add.ejs
    response.render('products/addProduct', {
        title: 'Add New Item',
        sname: '',
        qty: '',
        pictureimage: ''
    })
});
app.post('/addItem', function (request, response) {
    // Validate user input - ensure non emptiness
    request.assert('sname', 'sname is required').notEmpty();
    request.assert('qty', 'Quantity is required').notEmpty();
    request.assert('pictureimage', 'Picture is required').notEmpty();

    var errors = request.validationErrors();
    if (!errors) { // No validation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            sname: request.sanitize('sname').escape().trim(),
            qty: request.sanitize('qty').escape().trim(),
            pictureimage: request.sanitize('pictureimage').escape().trim()
        };
        // Running SQL query to insert data into the store table
        db.none('INSERT INTO products(sname, qty, pictureimage) VALUES($1, $2, $3)', [item.sname, item.qty, item.pictureimage])
            .then(function (result) {
                request.flash('success', 'Data added successfully!');
                // render views/store/add.ejs
                response.render('products/addProduct', {
                    title: 'Add New Item',
                    sname: '',
                    qty: '',
                    pictureimage: ''
                })
            }).catch(function (err) {
            request.flash('error', err);
            // render views/store/add.ejs
            response.render('products/addProduct', {
                title: 'Add New Item',
                sname: item.sname,
                qty: item.qty,
                pictureimage: item.pictureimage
            })
        })
    } else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        request.flash('error', error_msg);
        response.render('products/addProdcut', {
            title: 'Add New Item to Products',
            sname: request.body.sname,
            qty: request.body.qty,
            pictureimage: request.body.pictureimage
        })
    }
});

app.get('/edit/(:id)', function (request, response) {
    // Fetch the id of the item from the request.
    var itemId = request.params.id;

    // TODO: Initialize the query variable with a SQL query
    // that returns all columns of an item whose id = itemId in the
    // 'store' table
    var query = 'SELECT * FROM products WHERE id ='  + request.params.id + ';';
    db.one(query)
        .then(function (row) {
            // if item not found
            if (row.length === 0) {
                request.flash('error', 'Item not found with id = ' + request.params.id);
                response.redirect('/products')
            }
            else {
                response.render('products/editProduct', {
                    title: 'Edit Item',
                    id: row.id,
                    qty: row.qty,
                    pictureimage: row.pictureimage,
                    sname: row.sname
                })
            }
        })
        .catch(function (err) {
            request.flash('error', err);
            response.render('products/list', {
                title: 'Store listing',
                data: ''
            })
        })
});


// Route to update values. Notice that request method is PUT here
app.put('/edit/(:id)', function (req, res) {
    // Validate user input - ensure non emptiness
    req.assert('sname', 'Name is required').notEmpty();
    req.assert('qty', 'Quantity is required').notEmpty();
    req.assert('pictureimage', 'Picture is required').notEmpty();
    var itemId = req.params.id;

    var errors = req.validationErrors();
    if (!errors) { // No validation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            sname: req.sanitize('sname').escape().trim(),
            qty: req.sanitize('qty').escape().trim(),
            pictureimage: req.sanitize('pictureimage').escape().trim()
        };

        // TODO: Initialize the updateQuery variable with a SQL query
        // that updates the details of an item given its id
        // in the 'store' table
        var updateQuery = 'UPDATE products SET sname = '+"'" +item.sname + "'," + 'qty = ' + "'" + item.qty + "', " + 'pictureimage = ' + "'" + item.pictureimage + "' "+' WHERE id = ' + req.params.id +';';
        // Running SQL query to insert data into the store table
        db.none(updateQuery)
            .then(function (result) {
                req.flash('success', 'Data updated successfully!');
                res.redirect('/storeItems');
            })
            .catch(function (err) {
                req.flash('error', err);
                res.render('products/editProduct', {
                    title: 'Edit Item',
                    id: req.params.id,
                    sname: req.body.sname,
                    qty: req.body.qty,
                    pictureimage: req.body.pictureimage
                })
            })
    }
    else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        req.flash('error', error_msg);
        res.render('products/editProduct', {
            title: 'Edit Item,',
            id: req.body.id,
            sname: req.body.sname,
            qty: req.body.qty,
            pictureimage: req.body.pictureimage
        })
    }
});

app.get('/reStockList', function (request, response) {

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