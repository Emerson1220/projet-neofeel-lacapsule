var mongoose = require('mongoose')

var roadPlannerShema = mongoose.Schema({
    
    name: String,
    experienceName: String,


});

module.exports = mongoose.model('roadplanner', roadPlannerShema);

