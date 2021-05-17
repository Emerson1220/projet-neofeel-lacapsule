var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
}

mongoose.connect("mongodb+srv://admin:default@cluster0.o6j2r.mongodb.net/neofeel?retryWrites=true&w=majority",
    options,   
    function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("---------------BBD OK-----------------");
        }
    }
);