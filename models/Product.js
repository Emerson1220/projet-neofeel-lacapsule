const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: String,
    region : String,
    imageUrl: String,
    type: String,
    price: Number,
    validityPeriod: Date,
    experienceList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'experiences'
    }]
})

module.exports = moongoose.model('products', productSchema);