const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

// shape data
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String,
}, {
    timestamps: true,
    // statics: {
    //     findByHoiDanIt(name) {
    //         return this.find({ name: new RegExp(name, 'i') });
    //     },
    //     findByHoangHai(name) {
    //         return this.find({ name: new RegExp(name, 'i') });
    //     }
    // }
});

// config xóa mềm
// Override all methods
customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Customer = mongoose.model('customer', customerSchema);


module.exports = Customer;