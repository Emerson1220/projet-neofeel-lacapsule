var express = require('express');
var router = express.Router();
const Experience = require('../models/Experience');
const User = require('../models/User');
const uid2 = require('uid2');

//Gestion expérience ajout
//Body: expérience
//Response: result (true)
router.post('/manageexperiences', async function(req, res, next) {
  let address = {
    addressType: req.body.addressType,
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetOption,
    zipcode: req.body.zipcode,
    city: req.body.city,
    country: req.body.country
  }
  let partner = new User({
    firstName: req.body.partnerFirstName,
    lastName: req.body.partnerLastName,
    pseudo: req.body.partnerPseudo,
    email: req.body.partnerEmail,
    token: uid2(32),
    password: 'partner',
    address: address,
    category: 'partner',
    avatar: '/images/avatar.png',
    });

  let description = {
    title: req.body.title,
    content: req.body.content,
    review: req.body.review,
    tips: req.body.tips,
    partnerTips: req.body.partnerTips,
    partnerLogo: req.body.partnerLogo,
    imagesUrl: req.body.imagesUrl,
    imageBannerUrl: req.body.imageBannerUrl,
    imageIconsUrl: req.body.imageIconsUrl
  };

  let coordinate = {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  let experience = new Experience({
    name: req.body.name,
    
  })


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