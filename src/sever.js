const express = require('express')
const app = express();
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');
const apiRoutes = require('./routes/api')
const fileUpload = require('express-fileupload');

//Cách 2: sử dụng mongoDB driver
const { MongoClient } = require('mongodb');

//Sử dụng biến môi trường
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME

//config file upload
app.use(fileUpload());

app.set('views', './views');

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data


//config template engine
configViewEngine(app);

// Khai bao rount
app.use('/', webRouter)

app.use('/v1/api', apiRoutes)




//test connection
const connect = async () => {
    try {
        //using mongoose
        await connection();
        app.listen(port, hostname, () => {
            console.log(`App listening on port ${port}`);
        })
    } catch (error) {
        console.log("check Error:", error);
    }
};
connect()


// (async () => {
//     try {
//         await connection();
//         app.listen(port, hostname, () => {
//             console.log(`App listening on port ${port}`);
//         })
//     } catch (error) {
//         console.log("check Error:", error);
//     }
// })()

// simple query







