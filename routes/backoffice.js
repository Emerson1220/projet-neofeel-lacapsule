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
  let newPartner = new User({
    firstName: req.body.partnerFirstName,
    lastName: req.body.partnerLastName,
    pseudo: req.body.partnerPseudo,
    email: req.body.partnerEmail,
    token: uid2(32),
    password: 'partner',
    category: 'partner',
    avatar: '/images/avatar.png',
    creationDate: new Date(),
    phone: req.body.partnerPhone,
    facebook: req.body.partnerFacebook,
    website: req.body.partnerWebsite
    });

    let partnerSaved = await newPartner.save();
    partnerSaved.addresses.push(address);
    partnerSaved = await partnerSaved.save();

  let description = {
    title: req.body.descriptionTitle,
    content: req.body.descriptionContent,
    review: req.body.descriptionReview,
    tips: req.body.descriptionTips,
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

  let regionCode = '';
  if (req.body.region === 'Alsace-Vosges') {
    regionCode = 'ges';
  }

  let newExperience = new Experience({
    name: req.body.experienceName,
    subtitle: req.body.experienceSubtitle,
    partner: partnerSaved._id,
    region: req.body.region,
    regionCode: regionCode,
    activityType: req.body.activityType,
    activityCategory: req.body.activityCategory,
    activityFeeling: req.body.activityFeeling,
    activityTime: req.body.activityTime,
    description: description,
    coordinate: coordinate,
    creationDate: new Date(),
    advantage: req.body.advantage,
    advantageAmount: req.body.advantageAmount,
    budget: req.body.budget,
    tags: req.body.tags
  })

  let experienceSaved = await newExperience.save();

  experienceSaved
  ? res.json({ result: true, experience: experienceSaved, partner: partnerSaved })
  : res.json({ result: false }) ;
    // if (!name || !activity || !category ) {
    //     res.json({ result: false })
    // } else {
    //     res.json({ result: true, experience:{name: 'Vinot VArlot', activity: 'Visite vignes', category: 'gastronomie'}});
    // }
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