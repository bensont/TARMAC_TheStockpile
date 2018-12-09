var Sequelize = require('sequelize');


var opts = {
    define: {
        freezeTableName: true
    }
}
// LOCAL create a sequelize instance with our local postgres database information.
//var sequelize = new Sequelize('postgres://nero:postgres@localhost:5432/thestockpile', opts);

// WEB create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize(process.env.DATABASE_URL, opts);

// setup User model and its fields.
var orderProduct = sequelize.define('orderproduct', { 
	products_productid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
    orders_orderid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cost: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false
    },
    discountcost: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false
    },
    users_userid: {
        type: Sequelize.STRING,
        allowNull: false
    },                           
}, {
	timestamps: false,
	updatedAt: false, 
});

// create all the defined tables in the specified database.
//sequelize.sync()
//    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
//    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = orderProduct;