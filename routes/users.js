var express = require('express');
var router = express.Router();
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Inscription client (Sign up)
//Body: firstName, lastName, pseudo, password, email
//Response: result (true), { pseudo, token, firstName, lastName, email }
router.post('/signup', async function(req, res, next) {
  try {  
    // let user = JSON.parse(req.body);
    let user = req.body;

    const cost = 10;
    const hash = bcrypt.hashSync(user.password, cost);

    let newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      pseudo: user.pseudo,
      email: user.email,
      password: hash,
      token: uid2(32)
    });

    await newUser.save();
    res.json({ result: true, token: newUser.token, pseudo: newUser.pseudo })
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      let key = Object.keys(err.keyValue)[0];
      let keyMessage = '';
      if (key === 'pseudo') {
        keyMessage = 'Le pseudo'
      } else if (key === 'email') {
        keyMessage = "L'adresse mail"
      }
      let value = Object.values(err.keyValue)[0]
      res.json({ result: false, error: err.code, message: `${keyMessage} ${value} exist déjà.`})
    } else {
      res.json({ result: false, error: err })
    }
  }
// let firstName = req.body.firstName;
// let pseudo = req.body.pseudo;
// let email = req.body.email;

// if (!email || !firstName || !pseudo){

//   res.json({result: false})
// } else {
//   res.json({result: true, user: { pseudo: 'pim', firstName: 'Pierre', email: 'pierre@gmail.com'} });
// }
})

//Connexion client (sign in)
//Body: email, password
//Response: result (true), { pseudo, token, firstName, lastName, email }
router.post('/signin', async function(req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw 'email invalid'
    } 

    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ result: true, token: user.token, pseudo: user.pseudo })
    } else {
      throw 'password invalid'
    }
  } catch (err) {
    console.log(err)
    if (err === 'email invalid') {
      res.json({ result: false, error: err, message: "Votre adresse mail n'est pas valide. Veuillez vérifier vos informations saisies." })
    } else if (err === 'password invalid') {
      res.json({ result: false, error: err, message: "Votre mot de passe n'est pas valide. Veuillez vérifier vos informations saisies." })
    }
  }
// let password = req.body.password;
// let email = req.body.email;
// if (!email || !password){
//   res.json({result: false})
// } else {
//   res.json({ result: true, user: { pseudo: 'pim', firstName: 'Pierre',lastName: 'ferrand', email: 'pierre@gmail.com'} })
// }
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
