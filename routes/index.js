var express = require('express');
var router = express.Router();

//Recherche expériences
//Query: région (Alsace), catégorie (gastronomie)
//Response: result (true), expériences ['Vinot varlot']
router.get('/search', function(req, res, next) {
    let region = req.query.region;
    let category = req.query.category;

    if (!region && !category) {
        res.json({ result: false })
    } else {
        res.json({ result: true, experiences: [{ name: 'vinot varlot' }] });
    }
})

//Suggestions de voyage
//Query: durée, région
//Response: [roadtrips]
router.get('/roadtrips', function(req, res, next) {
  
})

//Ajout d'expérience au road planner
//Body: experienceID (12345)
//Response: result (true)
router.update('/myroadplanner', function(req, res, next) {
  
})

//Suppression d'expérience dans le road planner
//Body: experienceID (12345)
//Response: result (true)
router.delete('/myroadplanner', function(req, res, next) {
  
})

//Affichage du road planner
//Query: roadtripID (12345)
//Response: result(true), roadplanner [expérience: nom, région, catégorie, activité ]
router.get('/myroadplanner', function(req, res, next) {
  
})

//Sauvegarder le road planner
//Body: [experienceID]
//Response: result (true)
router.post('/myroadplanner', function(req, res, next) {
  
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
