var Sequelize = require('sequelize');

// LOCAL create a sequelize instance with our local postgres database information.
//var sequelize = new Sequelize('postgres://nero:postgres@localhost:5432/thestockpile');

// WEB create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize(process.env.DATABASE_URL);

// setup User model and its fields.
var order = sequelize.define('orders', { 
	orderid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    userid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalcost: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false
    },
    discounts: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalquantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userorderproduct_userid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false
    },                            
}, {
	timestamps: true,
	updatedAt: false,
	createdAt: 'timestamp',  
});

// create all the defined tables in the specified database.
//sequelize.sync()
//    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
//    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = order;