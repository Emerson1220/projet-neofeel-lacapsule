var express = require('express');
var router = express.Router();

//STRIPE
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51ItWKHK4yUyeZ8DTqXCM4ixI7xpzLNgd2sLglgnom7xUDNdcIpfzVgOGMhPovqQAp4ti8dLl9EgBEHyO51ONWjLg00rjQhJAvi')
//MODELS
const Experience = require('../models/Experience');
const Roadtrip = require('../models/Roadtrip');
const User = require('../models/User');

//ROOT ROUTE
router.get('/', function(req, res, next) {
    res.send('ok')
})

//Stripe payment
router.post('/auth/stripe', async function(req, res, next) {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur'
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})

//get experiences par région
router.post('/searchregions', async function(req, res, next) {
    try {
        let experiences = await Experience.find({ regionCode: req.body.region })
        .populate('partner')
        .exec();
        res.json({ result: true, data: experiences })
    } catch (err) {
        console.log(err)
        res.json({ result: false,  error: err, message: "Votre requête n'a pas pu aboutir. Veuillez réessayer plus tard."})
    }
})


//filtrer voyages par type
router.post('/searchtrips', async function(req, res, next) {
    try {
        let activities = req.body.activities;
        let roadtrips = [];
        for (let i=0 ; i<activities.length ; i++) {
            let response = await Roadtrip.find({ tags: activities[i] })
            .populate({
                path: 'days',
                populate: {
                    path: 'experiences',
                    model: 'experiences',
                    populate: {
                        path: 'partner',
                        model: 'users'
                    }
                }
            })
            .exec();
            roadtrips = roadtrips.concat(response);
        }
        res.json({ result: true, roadtrips: roadtrips })
    } catch (err) {
        console.log(err)
        res.json({ result: false, error: err, message: "Votre requête n'a pas pu aboutir. Veuillez réessayer plus tard."})
    }
})

//get liste des types d'activités
router.get('/activities', async function(req, res, next) {
    try {
        let aggregate = Roadtrip.aggregate();
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

//get suggestions Neofeel
router.get('/roadtrips', async function(req, res, next) {
    try {
        let roadtrips = await Roadtrip.find()
        .populate({
            path: 'days',
            populate: {
                path: 'experiences',
                model: 'experiences',
                populate: {
                    path: 'partner',
                    model: 'users'
                }
            }
        })
        .exec();
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
        .populate({
            path: 'roadtrips',
            populate: {
                path: 'days',
                populate: {
                    path: 'experiences',
                    model: 'experiences',
                    populate: {
                        path: 'partner',
                        model: 'users'
                    }
                }
            }
        })
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
        let roadtrip = await Roadtrip.findById(req.body.roadtripID)
        .populate({
            path: 'days',
            populate: {
                path: 'experiences',
                model: 'experiences',
                populate: {
                    path: 'partner',
                    model: 'users'
                }
            }
        })
        .exec();
        roadtrip.days[0].experiences.push(req.body.experienceID);

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
        let roadplanner = await Roadtrip.findById(req.params.roadtripID)
        .populate('roadtrips')
        .populate({
            path: 'roadtrips',
            populate: {
                path: 'days.experiences',
                model: 'experiences'
            }
        })
        .populate({
            path: 'roadtrips.days.experiences',
            populate: {
                path: 'partner',
                model: 'users'
            }
        })
        .exec();
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
router.get('/myroadplanner/:token', async function(req, res, next) {
    let user = await User.findOne({ token: req.params.token })
    .populate('roadtrips')
    .populate({
        path: 'roadtrips',
        populate: {
            path: 'days.experiences',
            model: 'experiences'
        }
    })
    .populate({
        path: 'roadtrips.days.experiences',
        populate: {
            path: 'partner',
            model: 'users'
        }
    })
    .exec();
    let current = user.roadtrips.sort((a, b) => {
        return a.creationDate - b.creationDate
    })[0];
    console.log(current)
    res.json({ result: true, currentRoadtrip: current })
})

//Sauvegarder le road planner
//Body: user token, trip name, trip region, trip region code
//Response: result (true)
router.post('/myroadplanner', async function(req, res, next) {
   try {
        let data = req.body;
        let experience = await Experience.findById(data.experienceID)
        .populate('partner')
        .exec();
        let user = await User.findOne({ token: data.token })
        let roadplanner = new Roadtrip({
            creationDate: new Date(),
            name: data.name,
            region: data.region,
            regionCode: data.regionCode,
            creator: user._id,
            days: [{
                name: 'Experiences',
                experiences: [data.experienceID]
            }]
        })

        let roadplannerSave = await roadplanner.save();
        user.roadtrips.push(roadplannerSave._id);
        let userSave = await user.save();

        roadplannerSave.days[0].experiences = [experience];
        res.json({ result: true, roadtrip: roadplannerSave })
    } catch(err) {
        console.log(err);
        res.json({ result: false, error: err })
    }
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
