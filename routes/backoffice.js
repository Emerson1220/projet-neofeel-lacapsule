var express = require('express');
var router = express.Router();

//Gestion expérience ajout
//Body: expérience
//Response: result (true)
router.post('/backoffice/manageexperiences', function(req, res, next) {
    let name= req.body.name;
    let activity= req.body.activity;
    let category= req.body.category;


    if (!name || !activity || !category ) {
        res.json({ result: false })
    } else {
        res.json({ result: true});
    }
})

//Générer la liste
//Query
//Response: result (true), expériences
router.get('/manageexperiences', function(req, res, next) {

})

//Gestion expérience modification
//Body: expérienceID
//Response: result (true), expérience
router.put('/manageexperiences', function(req, res, next) {

})

//Gestion expérience Delete
//Query: expérienceID
//Response: result (true)
router.delete('/manageexperiences', function(req, res, next) {

})

module.exports = router;