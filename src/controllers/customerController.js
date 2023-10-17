const { uploadSingleFile } = require('../services/fileService')
const { createCustomerService, createArrayCustomerService,
    getCustomersService, updateCustomerService, deleteCustomerService,
    deleteArrayCustomerService, getCustomersByPaginationService } = require('../services/customerService')
//validate
const Joi = require('joi');


//{key: value}
module.exports = {
    postCreateCustomer: async (req, res) => {

        let { name, address, phone, email, description } = req.body

        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
            address: Joi.string(),
            phone: Joi.string()
                .pattern(new RegExp('^[0-9]{8,11}$')),
            email: Joi.string()
                .email(),
            description: Joi.string(),
        })
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(200).json({
                msg: error
            })
        } else {
            let imageUrl = "";
            if (!req.files || Object.keys(req.files).length === 0) {
                // do nothing
            } else {
                let result = await uploadSingleFile(req.files.image);
                imageUrl = result.path;
            }
            let customer = await createCustomerService({ ...req.body, image: imageUrl });

            return res.status(200).json({
                EC: 0,
                data: customer
            })
        }




    },

    postCreateArrayCustomer: async (req, res) => {
        let customers = await createArrayCustomerService(req.body.customers)
        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: customers
            })

        }
    },
    getCustomers: async (req, res) => {
        let customers = await getCustomersService();
        return res.status(200).json({
            EC: 0,
            data: customers
        })
    },

    putUpdateCustomer: async (req, res) => {
        let customer = await updateCustomerService(req.body);
        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },
    deleteACustomer: async (req, res) => {
        let id = req.body.id;
        let result = await deleteCustomerService(id);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    deleteArrayCustomer: async (req, res) => {
        console.log("check array", req.body);
        let result = await deleteArrayCustomerService(req.body)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    getCustomersByPagination: async (req, res) => {

        let { limit, page, name } = req.query;
        let result = null;
        if (limit && page) {
            result = await getCustomersByPaginationService(limit, page, name, req.query);
        } else {
            result = await getCustomersByPaginationService();
        }

        return res.status(200).json({
            EC: 0,
            data: result
        })
    },


}