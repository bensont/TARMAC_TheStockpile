var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// LOCAL create a sequelize instance with our local postgres database information.
//var sequelize = new Sequelize('postgres://nero:postgres@localhost:5432/thestockpile');

// WEB create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize(process.env.DATABASE_URL);

// setup User model and its fields.
var User = sequelize.define('users', { 
	userid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissionslevel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    streetaddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zipcode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    deliveryinstructions: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },  
    create_time: {
        type: Sequelize.DATE,
        allowNull: false
    },                             
}, {
	timestamps: true,
	updatedAt: false,
	createdAt: 'create_time',
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }   
});

	User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    } 

    User.prototype.isAdmin = function(permissionslevel) {
        if (permissionslevel != "customer") {
            return true;
        }
    }     

// create all the defined tables in the specified database.
//sequelize.sync()
//    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
//    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;