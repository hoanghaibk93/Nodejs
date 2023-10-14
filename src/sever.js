const express = require('express')
const app = express();
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database')

//Sử dụng biến môi trường
const port = process.env.port || 8888;

app.set('views', './views');

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({extended: true})) // for form data


//config template engine
configViewEngine(app);

// Khai bao rount
app.use('/', webRouter)

//test connection


// simple query






app.listen(8081)