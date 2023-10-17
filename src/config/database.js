const mysql = require('mysql2/promise');
require('dotenv').config();

const mongoose = require('mongoose');
// create the connection to database mySQL 
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT, //default: 3306
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

const connection = async () => {
    const options = {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
    }
    try {
        await mongoose.connect(process.env.DB_HOST2, options);
        console.log('Connect succsessfully !!!');
    } catch (error) {
        console.log("check error: ", error);
    }
}

module.exports = connection;