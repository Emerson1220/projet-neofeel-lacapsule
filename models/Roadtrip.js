const mongoose = require('mongoose');

const roadtripSchema = mongoose.Schema({
    name: String,
    experiences : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'experiences'
    }],
    images: Array,
    comments: Array,
    creationDate : Date
});

module.exports =mongoose.model('roadtrips', roadtripSchema);