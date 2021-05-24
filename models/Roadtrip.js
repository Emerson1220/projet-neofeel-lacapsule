const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
        name: String,
        experiences: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'experiences'
        }]
})

const roadtripSchema = mongoose.Schema({
    name: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    days: [daySchema],
    images: Array,
    comments: Array,
    creationDate : Date,
    region: String,
    regionCode: String,
    type: String,
    tags: Array,
});

module.exports =mongoose.model('roadtrips', roadtripSchema);