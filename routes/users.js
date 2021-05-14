var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Inscription client (Sign up)
//Body: firstName, lastName, pseudo, password, email
//Response: result (true), { pseudo, token, firstName, lastName, email }
router.post('/signup', function(req, res, next) {
let firstName = req.body.firstName;
let pseudo = req.body.pseudo;
let email = req.body.email;

if (!email || !firstName || !pseudo){

  res.json({result: false})
} else {
  res.json({result: true, user: { pseudo: 'pim', firstName: 'Pierre', email: 'pierre@gmail.com'} });
}
})

//Connexion client (sign in)
//Body: email, password
//Response: result (true), { pseudo, token, firstName, lastName, email }
router.post('/signin', function(req, res, next) {
let password = req.body.password;
let email = req.body.email;
if (!email || !password){
  res.json({result: false})
} else {
  res.json({ result: true, user: { pseudo: 'pim', firstName: 'Pierre',lastName: 'ferrand', email: 'pierre@gmail.com'} })
}
})


// Accés compte personnel
//Query: token
//Response: result (true), user: {{ pseudo, firstName, lastName, email }}
router.get('/myaccount', function(req, res, next) {

let token = req.query.token;

if (!token ){
  res.json({result: false})
} else {
  res.json({ result: true, user: { pseudo: 'pim', firstName: 'Pierre',lastName: 'ferrand', email: 'pierre@gmail.com'} })
}
})

//Modification compte personnel
//Body: firstName , email
//Response: result (true), nouveau firstName, nouveau email
router.put('/myaccount', function(req, res, next) {
  
let firstName =req.body.firstName;
let email= req.body.email;

if (!firstName || !email ){
  res.json({result: false})
} else {
  res.json({ result: true, user: { pseudo: 'pim', firstName: 'Charles',lastName: 'ferrand', email: 'charles@gmail.com'} })
}


})

module.exports = router;
