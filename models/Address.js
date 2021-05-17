const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    addressType: String,
    streetNumber: String,
    streetName: String,
    streetOption: String,
    zipcode: String,
    city: String,
    country: String
})

module.exports = addressSchema;