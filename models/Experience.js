const mongoose = require('mongoose');
const addressSchema = require('./Address');

const descriptionSchema = mongoose.Schema({
    title: String,
    content: String,
    review: String,
    tips: String,
    partnerTips: String,
    partnerLogo: String,
    imagesUrl: Array,
    imageBannerUrl: String,
    imageIconsUrl: String
});

const coordinateSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number
});

const experienceSchema = mongoose.Schema({
    name: String,
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    region: String,
    address: addressSchema,
    activityType: String,
    activityCategory: String,
    activityFeeling: String,
    activityTime: String,
    description: descriptionSchema,
    coordinate: coordinateSchema,
    creationDate: Date,
    advantage: String,
    advantageAmount: Number,
    budget: String,
});

module.exports = mongoose.model('experiences', experienceSchema);