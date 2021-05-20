var mongoose = require('mongoose')

var roadPlannerShema = mongoose.Schema({
    name: String,
    experiences : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiences'
    },


});

module.exports =mongoose.model('roadplanner', roadPlannerShema);

