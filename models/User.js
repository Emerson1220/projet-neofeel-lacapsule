const mongoose = require('mongoose');
const addressSchema = require('./Address');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    pseudo: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    token: String,
    password: {
        type: String,
        required: true
    },
    roadtrips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roadtrips'
    }],
    addresses: [addressSchema],
    category: String,
    avatar: String,
    creationDate: Date,
    phone: String,
    facebook: String,
    website: String
})

module.exports = mongoose.model('users', userSchema);