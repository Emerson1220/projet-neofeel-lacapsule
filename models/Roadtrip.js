const mongoose = require('mongoose');

const roadtripSchema = mongoose.Schema({
    name: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    experiences : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'experiences'
    }],
    images: Array,
    comments: Array,
    creationDate : Date,
    region: String,
    regionCode: String,
    type: String
});

module.exports =mongoose.model('roadtrips', roadtripSchema);