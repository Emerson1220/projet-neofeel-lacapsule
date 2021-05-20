var express = require('express');
var router = express.Router();

//MODELS
const Experience = require('../models/Experience');
const Roadtrip = require('../models/Roadtrip');

//get experiences par région
router.post('/searchregions', async function(req, res, next) {
    try {
        let experiences = await Experience.find({ regionCode: req.body.region }).populate('partner').exec();
        res.json({ result: true, data: experiences })
    } catch (err) {
        console.log(err)
        res.json({ result: false,  error: err, message: "Votre requête n'a pas pu aboutir. Veuillez réessayer plus tard."})
    }
})

//get experiences par type
router.post('/searchtrips', async function(req, res, next) {
    try {
        let a = JSON.parse(req.body.activities);
        let experiences = [];
        for (let i=0 ; i<a.length ; i++) {
            let response = await Experience.find({ tags: a[i] }).populate('partner').exec();
            experiences = experiences.concat(response);
        }
        res.json({ result: true, data: experiences })
    } catch (err) {
        console.log(err)
        res.json({ result: false, error: err, message: "Votre requête n'a pas pu aboutir. Veuillez réessayer plus tard."})
    }
})

//get liste des types d'activités
router.get('/activities', async function(req, res, next) {
    try {
        let aggregate = Experience.aggregate();
        aggregate.unwind('tags');
        aggregate.group({ _id: '$tags' });
        let data = await aggregate.exec();
        let activities = data.map(e => e._id)
        res.json({ result: true, data: activities });
    } catch(err) {
        console.log(err);
        res.json({ result: false, error: err })
    }
})

//get liste des voyages
router.get('/roadtrips', async function(req, res, next) {
    try {
        let roadtrips = await Roadtrip.find();
        res.json({ result: true, roadtrips: roadtrips })
    } catch (err) {
        console.log(err);
        res.json({ result: false, error: err })
    }
})

//Voyages utilisateur
router.get('/roadtrips/:token', async function(req, res, next) {
    try {
        let user = await User.findOne({ token: req.params.token })
        .populate('roadtrips')
        .exec();
        res.json({ result: true, roadtrips: user.roadtrips })
    } catch (err) {
        console.log(err);
        res.json({ result: false, error: err })
    }
})

//Ajout d'expérience au road planner
//Body: experienceID (12345)
//Response: result (true)

router.put('/myroadplanner', async function(req, res, next) {
    try {
        let roadtrip = await Roadtrip.findById(req.body.roadtripID);
        roadtrip.experiences.push(req.body.experienceID);

        let roadtripSaved = await roadtrip.save();
        res.json({ result: true, roadtrip: roadtripSaved })
    } catch (err) {
        console.log(err)
        res.json({ result: false, error: err })
    }
})

//Suppression d'expérience dans le road planner
//Body: experienceID (12345)
//Response: result (true)
router.delete('/myroadplanner/:roadtripID/:experienceID', async function(req, res, next) {
    try {
        let roadplanner = await Roadtrip.findById(req.params.roadtripID).populate('experiences').exec();
        roadplanner.experiences = roadplanner.experiences.filter(e => e.id !== req.params.experienceID);
        let roadplannerSave = await roadplanner.save();
        res.json({ result: true, roadplanner: roadplannerSave })
    } catch (err) {
        console.log(err)
        res.json({ result: false, error: err })
    }
})

//Affichage du road planner
//Query: roadtripID (12345)
//Response: result(true), roadplanner [expérience: nom, région, catégorie, activité ]
router.get('/myroadplanner/:userID', async function(req, res, next) {

})

//Sauvegarder le road planner
//Body: user token, trip name, trip region, trip region code
//Response: result (true)
router.post('/myroadplanner', async function(req, res, next) {
    let user = await User.findOne({ token: req.body.token })
    let roadplanner = new Roadtrip({
        creationDate: new Date(),
        name: req.body.name,
        region: req.body.region,
        regionCode: req.body.regionCode,
        creator: user._id
    })
    let roadplannerSave = await roadplanner.save();
    res.json({ result: true, roadplanner: roadplannerSave })
})

//Visualisation des avantages
//Body: [experienceID]
//Response: result (true), [avantages], montant
router.get('/avantages', function(req, res, next) {

})

//Achat de NEOPASS
//Body: userId (12345), productID (12345)
//Response: result (true), { order }
router.post('/confirm', function(req, res, next) {

})

//Détails du NEOPASS
//Query: productID
//Response: result (true), product (neopass (region))
router.get('/myproduct', function(req, res, next) {

})

//Partage de voyage
//Body: [expériences], nom, commentaires, photos, userID
//Response: result (true), voyage
router.post('/sharetrip', function(req, res, next){
    !req.body.experiences
    ? res.json({ result: false }) 
    : res.json({ result: true, roadtripID: '1234567' }) ;
})

//actualités météo
//Query: coordonées
//Response: result (true), météo
router.get('/weather', function(req, res, next) {
  
})


//Adhésion partenaire
//Body: name (Dupont), firstName (Michel), token (1234), email: 'micheldupont@gmail.com', password (1234), adresse (6 rue du Puit)
//Response: result (true)
router.post('/becomeapartner', function(req, res, next) {

})

module.exports = router;
