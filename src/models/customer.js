const mongoose = require('mongoose')

// shape data
const customerSchema = new mongoose.Schema({
    name: {type: String,
        required: true
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String,
},{timestamps: true});
const Customer = mongoose.model('user', customerSchema);


module.exports = Customer;