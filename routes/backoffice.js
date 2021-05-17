var express = require('express');
var router = express.Router();

//Gestion expérience ajout
//Body: expérience
//Response: result (true)
router.post('/manageexperiences', function(req, res, next) {
    let name= req.body.name;
    let activity= req.body.activity;
    let category= req.body.category;


    if (!name || !activity || !category ) {
        res.json({ result: false })
    } else {
        res.json({ result: true, experience:{name: 'Vinot VArlot', activity: 'Visite vignes', category: 'gastronomie'}});
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

    let experienceID = req.body.experienceID;
    let name= req.body.name;
    let activity= req.body.activity;
    let category= req.body.category;

    if (!experienceID || !name || !activity || !category ){
      res.json({result: false})
    } else {
      res.json({ result: true, experience:{experienceID: '123', name: 'Vinot VArlot', activity: 'Visite vignes', category: 'gastronomie'}});
    }
    })

//Gestion expérience Delete
//Query: expérienceID
//Response: result (true)
router.delete('/manageexperiences', function(req, res, next) {

})

module.exports = router;