const express = require('express');
const routerAPI = express.Router();
const { getUsersApi, postCreateUserAPI, putUpdateUserAPI,
    deleteUserAPI, postUploadSingleFileApi, postUploadMultipleFileApi } = require('../controllers/apiController')
const { postCreateCustomer, postCreateArrayCustomer, getCustomers, putUpdateCustomer, deleteACustomer
    , deleteArrayCustomer, getCustomersByPagination } = require('../controllers/customerController')
const { postCreateProject, getAllProject, deleteAProject, putUpdateProject } = require('../controllers/projectController')
routerAPI.get('/users', getUsersApi);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', putUpdateUserAPI);

routerAPI.delete('/users', deleteUserAPI);

routerAPI.post('/file', postUploadSingleFileApi);

routerAPI.post('/files', postUploadMultipleFileApi);

routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);
routerAPI.get('/customers', getCustomers);
routerAPI.put('/customers', putUpdateCustomer);
routerAPI.delete('/customers', deleteACustomer);
routerAPI.delete('/customers-many', deleteArrayCustomer);
routerAPI.get('/info', (req, res) => {
    res.status(200).json({
        data: req.query
    })
});
routerAPI.get('/info/:name/:adress', (req, res) => {
    console.log("check request params:", req.params);
    res.status(200).json({
        data: req.params
    })
});

routerAPI.get('/customers/info', getCustomersByPagination);

//project

routerAPI.post('/projects', postCreateProject);
routerAPI.get('/projects', getAllProject);
routerAPI.delete('/projects', deleteAProject);
routerAPI.put('/projects', putUpdateProject);




module.exports = routerAPI;