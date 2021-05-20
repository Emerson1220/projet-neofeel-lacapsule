var express = require('express');
var router = express.Router();
const Experience = require('../models/Experience');

//MODELS
const Experience = require('../models/Experience');
const Roadtrip = require('../models/Roadtrip');

//Recherche expériences
//Query: région (Alsace), catégorie (gastronomie)
//Response: result (true), expériences ['Vinot varlot']
router.post('/searchregions', async function(req, res, next) {
    try {
        let experiences = await Experience.find({ regionCode: req.body.region });
        res.json({ result: true, data: experiences })
    } catch (err) {
        console.log(err)
        res.json({ result: false,  error: err, message: "Votre requête n'a pas pu aboutir. Veuillez réessayer plus tard."})
    }
})

router.post('/searchtrips', async function(req, res, next) {
    try {
        let a = JSON.parse(req.body.activities);
        let experiences = [];
        for (let i=0 ; i<a.length ; i++) {
            let response = await Experience.find({ tags: a[i] });
            experiences = experiences.concat(response);
        }
        res.json({ result: true, data: experiences })
    } catch (err) {
        console.log(err)
        res.json({ result: false, error: err, message: "Votre requête n'a pas pu aboutir. Veuillez réessayer plus tard."})
    }
})

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

router.get('/activities', async function(req, res, next) {
    let aggregate = Experience.aggregate();
    aggregate.group({ id: '$tags' })
})

//Suggestions de voyage
//Query: durée, région
//Response: [roadtrips]
router.get('/roadtrips', function(req, res, next) {
    if (!req.query.region) {
        res.json({ result: false })
    } else {
        res.json({ result: true, experiences: [{ name: 'vinot varlot' }] });
    }
})

//Ajout d'expérience au road planner
//Body: experienceID (12345)
//Response: result (true)

router.put('/myroadplanner', async function(req, res, next) {
    let roadtrip = await Roadtrip.findById(req.body.roadtripID);
    roadtrip.experiences.push(req.body.experienceID);
    let roadtripSaved = await roadtrip.save();
    !roadtripSaved
    ? res.json({ result: false })
    : res.json({ result: true, roadtrip: roadtrip, saved: roadtripSaved })

})

//Suppression d'expérience dans le road planner
//Body: experienceID (12345)
//Response: result (true)
router.delete('/myroadplanner/:roadtripID/:experienceID', async function(req, res, next) {

})

//Affichage du road planner
//Query: roadtripID (12345)
//Response: result(true), roadplanner [expérience: nom, région, catégorie, activité ]
router.get('/myroadplanner', function(req, res, next) {

})

//Sauvegarder le road planner
//Body: [experienceID]
//Response: result (true)
router.post('/myroadplanner', async function(req, res, next) {
    let roadplanner = new Roadtrip({
        experiences: []
    })

    await roadplanner.save();
    res.json({ result: true, roadplanner: roadplanner })
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
