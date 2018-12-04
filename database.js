var pgp = require('pg-promise')();

//local
// const dbConfig = {
//    host: 'localhost',
//    port: 5432,
//    database: 'thestockpile',
//    user: 'postgres',
//    password: '1234' // TODO: Fill in your PostgreSQL password here.
//                 // Use empty string if you did not set a password
// };

//remote
var dbConfig = process.env.DATABASE_URL;

var db = pgp(dbConfig);

module.exports = db;
