var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Inscription client (Sign up)
//Body: firstname, lastname, pseudo, password, email
//Response: result (true), { pseudo, token, firstName, lastName, email }
router.post('/signup', function(req, res, next) {

})

//Connexion client (sign in)
//Body: email, password
//Response: result (true), { pseudo, token, firstName, lastName, email }
router.post('/signin', function(req, res, next) {

})

//Accès compte personnel
//Query: token
//Response: result (true), user
router.get('/myaccount', function(req, res, next) {

})

//Modification compte personnel
//Body: nouveau compte perso
//Response: result (true)
router.update('/myaccount', function(req, res, next) {

})

module.exports = router;
