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

//maybe make a list one where it depends on which section it is in
//Chair, dresser, mirror, lighting, table
//I think we first have to do is figure out how many diffrent kinds of product type

/*app.get('/productType', function (request, response) {

    // TODO: Initialize the query variable with a SQL query
    // that returns all the rows and columns in the 'store' table
    var query = 'SELECT type FROM products GROUP BY type;';

    db.any(query)
      .then(function (rows) {
          // render views/store/list.ejs template file
          response.render('products/listTypes', {
              title: 'Store product Types',
              data: rows
          })
      })
      .catch(function (err) {
          // display error message in case an error
          request.flash('error', err);
          response.render('products/listTypes', {
              title: 'Store product Types',
              data: ''
          })
      })
});*/
/*
Our next step is to be able to list items based on product type

app.get('/productType', function (request, response) {

    // TODO: Initialize the query variable with a SQL query
    // that returns all the rows and columns in the 'store' table
    var query = 'SELECT type FROM products GROUP BY type;';

    db.any(query)
      .then(function (rows) {
          // render views/store/list.ejs template file
          response.render('products/listTypes', {
              title: 'Store product Types',
              data: rows
          })
      })
      .catch(function (err) {
          // display error message in case an error
          request.flash('error', err);
          response.render('products/listTypes', {
              title: 'Store product Types',
              data: ''
          })
      })
});

*/

app.get('/addItem', function (request, response) {
    // render views/store/add.ejs
    response.render('products/addProduct', {
        title: 'Add New Item',
        name: '',
        brand: '',
        type: '',
        cost: '',
        material: '',
        stock: '',
        image: '',
        image2: '',
        image3: '',
        description: '',
        dimensions: ''
    })
});
app.post('/addItem', function (request, response) {
    // ValProductIDate user input - ensure non emptiness
    request.assert('name', 'Name is required').notEmpty();
    request.assert('brand', 'Brand is required').notEmpty();
    request.assert('type', 'Type is required').notEmpty();
    request.assert('cost', 'Cost is required').notEmpty();
    request.assert('stock', 'Quantity is required').notEmpty();
    request.assert('image', 'Picture is required').notEmpty();
    request.assert('image2', 'Picture 2 is required').notEmpty();
    request.assert('image3', 'Picture 3 is required').notEmpty();
    request.assert('description', 'Description is required').notEmpty();
    request.assert('dimensions', 'Dimensions are required').notEmpty();

    var errors = request.validationErrors();
    if (!errors) { // No valProductIDation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            name: request.sanitize('name').escape().trim(),
            brand: request.sanitize('brand').escape().trim(),
            type: request.sanitize('type').escape().trim(),
            cost: request.sanitize('cost').escape().trim(),
            stock: request.sanitize('stock').escape().trim(),
            material: request.sanitize('material').escape().trim(),
            image: request.sanitize('image').escape().trim(),
            image2: request.sanitize('image2').escape().trim(),
            image3: request.sanitize('image3').escape().trim(),
            description: request.sanitize('description').escape().trim(),
            dimensions: request.sanitize('dimensions').escape().trim()
        };
        // Running SQL query to insert data into the store table
        //Our chairs are only made with the finest materials and are each checked for quality by one of our master craftsmen. No matter your budget or style, we have a classy seat for your needs.
        db.none('INSERT INTO products(name, brand,types,cost, material, image,image2,image3,description,dimensions, stock,categorydescription) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',[item.name, item.brand, item.type, item.cost, item.material, item.image, item.image2, item.image3, item.description, item.dimensions, item.stock, 'Our chairs are only made with the finest materials and are each checked for quality by one of our master craftsmen. No matter your budget or style, we have a classy seat for your needs.'])
            .then(function (result) {
                request.flash('success', 'Data added successfully!');
                // render views/store/add.ejs
                response.render('products/addProduct', {
                    title: 'Add New Item',
                    name: '',
                    brand: '',
                    type: '',
                    cost: '',
                    material: '',
                    stock: '',
                    image: '',
                    image2: '',
                    image3: '',
                    description: '',
                    dimensions: ''
                })
            }).catch(function (err) {
            request.flash('error', err);
            // render views/store/add.ejs
            response.render('products/addProduct', {
                title: 'Add New Item',
                name: '',
                brand: '',
                type: '',
                cost: '',
                material: '',
                stock: '',
                image: '',
                image2: '',
                image3: '',
                description: '',
                dimensions: ''
            })
        })
    } else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        request.flash('error', error_msg);
        response.render('products/addProduct', {
            title: 'Add New Item to Products',
            name: request.body.name,
            brand: request.body.brand,
            type: request.body.type,
            cost: request.body.cost,
            material: request.body.material,
            stock: request.body.stock,
            image: request.body.image,
            image2: request.body.image2,
            image3: request.body.image3,
            description: request.body.description,
            dimensions: request.body.dimensions
        })
    }
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
                response.redirect('/products')
            }
            else {
                response.render('products/editProduct', {
                    title: 'Edit Item',
                    productid: row.productid,
                    name: row.name,
                    brand: row.brand,
                    type: row.type,
                    cost: row.cost,
                    material: row.material,
                    image: row.image,
                    image2: row.image2,
                    image3: row.image3,
                    description: row.description,
                    dimensions: row.dimensions,
                    stock: row.stock
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
app.put('/edit/(:productid)', function (req, res) {
    // ValProductIDate user input - ensure non emptiness
    req.assert('name', 'Name is required').notEmpty();
    req.assert('brand', 'Brand is required').notEmpty();
    req.assert('type', 'Type is required').notEmpty();
    req.assert('cost', 'Cost is required').notEmpty();
    req.assert('stock', 'Quantity is required').notEmpty();
    req.assert('image', 'Picture is required').notEmpty();
    req.assert('image2', 'Picture 2 is required').notEmpty();
    req.assert('image3', 'Picture 3 is required').notEmpty();
    req.assert('description', 'Description is required').notEmpty();
    var itemProductID = req.params.produtid;

    var errors = req.validationErrors();
    if (!errors) { // No valProductIDation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            name: req.sanitize('name').escape().trim(),
            brand: req.sanitize('brand').escape().trim(),
            type: req.sanitize('type').escape().trim(),
            cost: req.sanitize('cost').escape().trim(),
            stock: req.sanitize('stock').escape().trim(),
            material: req.sanitize('material').escape().trim(),
            image: req.sanitize('image').escape().trim(),
            image2: req.sanitize('image2').escape().trim(),
            image3: req.sanitize('image3').escape().trim(),
            description: req.sanitize('description').escape().trim(),
            dimensions: req.sanitize('dimensions').escape().trim()
        };

        // TODO: Initialize the updateQuery variable with a SQL query
        // that updates the details of an item given its ProductID
        // in the 'store' table
        var updateQuery = 'UPDATE products SET name = '+"'" +item.name + "'," +'brand = '+ "'" + item.brand + "', "+ 'type = '+ "'" + item.type+ "', "+ 'cost = ' + "'"+ item.cost + "', " + 'material = ' + "'" + item.material + "', " +'stock = ' + "'" + item.stock + "', " + 'image = ' + "'" + item.image + "', " + 'image2 = ' + "'" + item.image2 + "', "+ 'image3 = ' + "'" + item.image3 + "', "+ 'description = '+ "'"+ item.description + "', "+ 'dimensions = '+ "'" + item.dimensions + "' " + ' WHERE productid = ' + req.params.productid +';';
        // Running SQL query to insert data into the store table
        db.none(updateQuery)
            .then(row => {
                req.flash('success', 'Data updated successfully!');
                res.redirect('/admin/storeItems');
            })
            .catch(function (err) {
                req.flash('error', err);
                res.render('products/editProduct', {
                    title: 'Edit Item',
                    productid: itemProductID,
                    name: row.name,
                    brand: row.brand,
                    type: row.type,
                    cost: row.cost,
                    material: row.material,
                    image: row.image,
                    image2: row.image2,
                    image3: row.image3,
                    description: row.description,
                    dimensions: row.dimensions,
                    stock: row.stock
                })
            })
    }
    else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        req.flash('error', error_msg);
        res.render('products/editProduct', {
            title: 'Edit Item',
            productid: row.productid,
            name: row.name,
            brand: row.brand,
            type: row.type,
            cost: row.cost,
            material: row.material,
            image: row.image,
            image2: row.image2,
            image3: row.image3,
            description: row.description,
            dimensions: row.dimensions,
            stock: row.stock
        })
    }
});

// Route to delete an item. Notice that request method is DELETE here
app.delete('/delete/(:productid)', function (req, res, next) {
    // Fetch item id of the item to be deleted from the request.
    var itemId = req.params.productid;

    // TODO: Initialize the deleteQuery variable with a SQL query
    // that deletes an item whose id = itemId in the
    // 'store' table
    var deleteQuery = 'DELETE FROM products WHERE productid ='+ itemId;
    db.none(deleteQuery)
        .then(function (result) {
                  req.flash('success', 'successfully deleted it');
                  res.redirect('/admin/storeItems');
        })
        .catch(function (err) {
                   req.flash('error', err);
                   res.redirect('/admin/storeItems')
        })
});