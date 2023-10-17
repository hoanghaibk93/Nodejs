const Customer = require('../models/customer');
const aqp = require('api-query-params');
const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create(customerData);
        return result
    } catch (error) {
        console.log(error);
        return null
    }
}
const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const getCustomersService = async () => {
    try {
        let result = await Customer.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateCustomerService = async (customerObject) => {
    try {
        let result = await Customer.updateOne({ _id: customerObject._id }, customerObject)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteCustomerService = async (id) => {
    try {
        // Xóa mềm
        let result = await Customer.deleteById(id)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const deleteArrayCustomerService = async (arr) => {
    try {
        // Xóa mềm
        let result = await Customer.delete({ _id: { $in: arr.customers } })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getCustomersByPaginationService = async (limit, page, name, queryString) => {
    try {
        let result = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter, skip } = aqp(queryString);
            delete filter.page;
            console.log("check", filter);
            result = await Customer.find(filter).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({});
        }
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    createCustomerService,
    createArrayCustomerService,
    getCustomersService,
    updateCustomerService,
    deleteCustomerService,
    deleteArrayCustomerService,
    getCustomersByPaginationService
}