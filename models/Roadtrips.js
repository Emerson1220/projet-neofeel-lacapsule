const mongoose = require('mongoose');

const roadtripSchema = mongoose.Schema({
    name: String,
    experiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'experiences'
    }],
    creationDate: Date,
    comments: Array,
    photos: Array
})

module.exports = mongoose.model('roadtrips', roadtripSchema);