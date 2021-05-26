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
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'eur',
            description: 'Neopass'
    })
        res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
});

//get experiences par région
router.post('/searchregions', async function(req, res, next) {
    try {
        let experiences = await Experience.find({ regionCode: req.body.region })
        .populate('partner')
        .exec();
        console.log(experiences)
        res.json({ result: true, data: experiences })
    } catch (err) {
        console.log(err)
        res.json({ result: false,  error: err, message: "Votre requête n'a pas pu aboutir. Veuillez réessayer plus tard."})
    }
})


//filtrer voyages par type
router.post('/searchtrips', async function(req, res, next) {
    try {
        let activities = JSON.parse(req.body.activities);
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
        let roadtrips = await Roadtrip.find({ $or : [ { type: 'admin' }, { type: 'public' } ] })
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

// //Voyages utilisateur
// router.get('/roadtrips/:token', async function(req, res, next) {
//     try {
//         let user = await User.findOne({ token: req.params.token })
//         .populate('roadtrips')
//         .populate({
//             path: 'roadtrips',
//             populate: {
//                 path: 'days',
//                 populate: {
//                     path: 'experiences',
//                     model: 'experiences',
//                     populate: {
//                         path: 'partner',
//                         model: 'users'
//                     }
//                 }
//             }
//         })
//         .exec();
//         res.json({ result: true, roadtrips: user.roadtrips })
//     } catch (err) {
//         console.log(err);
//         res.json({ result: false, error: err })
//     }
// })

//ajout suggestion de voyage
router.post('/addroadtrip', async function(req, res, next) {
    try {
        let data = JSON.parse(req.body.data);
        let user = await User.findOne({ token: data.token });
        user.roadtrips.push(data.roadtripID);

        let userSaved = await user.save();
        res.json({ result: true })
    } catch(err) {
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
        console.log(roadtrip)
        if (roadtrip.days[0].experiences.some(e => e.id === req.body.experienceID)) {
            throw 'already exists'
        }
        roadtrip.days[0].experiences.push(req.body.experienceID);

        let roadtripSaved = await roadtrip.save();
        res.json({ result: true, roadtrip: roadtripSaved })
    } catch (err) {
        console.log(err)
        if (err === 'already exists') {
            res.json({ result: false, message: err})
        }
        res.json({ result: false, message: 'failure' })
    }
})

//Suppression d'expérience dans le road planner
//Body: experienceID (12345)
//Response: result (true)
router.delete('/myroadplanner/:token/:roadtripID/:experienceID', async function(req, res, next) {
    try {
        let user = await User.findOne({ token: req.params.token });
        let roadtrip = await Roadtrip.findById(req.params.roadtripID)
        .populate('roadtrips')
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

        if (roadtrip.creator === user._id) {
            throw 'not authorized'
        }

        roadtrip.days[0].experiences = roadtrip.days[0].experiences.filter(e => e.id !== req.params.experienceID);
        let roadtripSave = await roadtrip.save();
        res.json({ result: true })
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
    let current = user.roadtrips.sort((a, b) => {
        return a.creationDate - b.creationDate
    })[0];
    console.log({current: current})
    res.json({ result: true, currentRoadtrip: current })
})

//ajouter un voyage à la liste perso
router.post('/addtrip', async function(req, res, next) {
    try {
        let data = req.body;
        let user = await User.findOne({ token: data.token });
        user.roadtrips.push(data.roadtripID);

        let userSave = await user.save();
        res.json({ result: true, user: userSave })
    } catch(err) {
        console.log(err)
        res.json({ result: false })
    }
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

//Achat de NEOPASS
//Body: userId (12345), productID (12345)
//Response: result (true), { order }
router.post('/confirm', function(req, res, next) {

})

//Partage de voyage
//Body: roadtrip({name, id, comments, photos, duration}), token(user)
//Response: result, 
router.post('/sharetrip', async function(req, res, next){
    try {
        let data = JSON.parse(req.body.data);
        console.log(data);

        let user = await User.findOne({ token: data.token });
        let roadtrip = await Roadtrip.findById(data.roadtripID);

        if (roadtrip.creator === user._id) {
            throw 'not authorized'
        }
        
        roadtrip.type = 'public';
        roadtrip.comments.push(data.comment);
        roadtrip.images.concat(data.photos);

        await roadtrip.save();
        res.json({ result: true, roadtrip: roadtrip })
    } catch (err) {
        console.log(err)
        res.json({ result: false, message: err })
    }

})

module.exports = router;
