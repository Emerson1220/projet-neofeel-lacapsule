var express = require('express');
var router = express.Router();
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('884422014939-bu63e3eoqfgv1vrmsn01qd0ukfl2uumf.apps.googleusercontent.com')

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
    let user = req.body;
    if (!user.pseudo || !user.email || !user.password) {
      throw 'sign up incomplete'
    }
    const cost = 10;
    const hash = bcrypt.hashSync(user.password, cost);

    let newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      pseudo: user.pseudo,
      email: user.email,
      password: hash,
      token: uid2(32),
      category: 'user'
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
      res.json({ result: false, error: err.code, message: `${keyMessage} ${value} exist déjà. Veuillez vérifier les informations saisies.`})
    } if (err === 'sign up incomplete') {
      res.json({ result: false, error: err, message: "Merci de remplir tous les champs requis." })
    } else {
      res.json({ result: false, error: err })
    }
  }
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
});

router.get('/auth/facebook/signup/:accessToken', async function(req, res, next) {
  try {
    const { data } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name', 'picture'].join(', '),
        access_token: req.params.accessToken
      }
    });
    console.log(data)
    if (!data) {
      throw 'facebook login failed'
    }
    
    let user = new User({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      token: uid2(32),
      category: 'user',
      avatar: data.picture.data.url
    })
    console.log(user);
    let newUser = await user.save();
    res.json({ result: true, token: newUser.token })
  } catch(err) {
    console.log(err)
    res.json({ result: false, error: err })
  }
})

router.get('/auth/google/signup/:accessToken', async function(req, res, next) {
  try {
    const { accessToken } = req.params;
  
    const ticket = await client.verifyIdToken({
      idToken: accessToken,
      audience: "884422014939-bu63e3eoqfgv1vrmsn01qd0ukfl2uumf.apps.googleusercontent.com"
    });
    res.send(ticket);
    const { name, email, picture } = ticket.getPayload();
    console.log({ name, email, picture })
    let user = new User({
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[-1],
      email: email,
      token: uid2(32),
      avatar: picture,
      category: 'user'
    });

    let newUser = await user.save();
    res.json({ result: true, token: newUser.token })
  } catch (err) {
    console.log(err);
    res.json({ result: false, error: err })
  }

})

router.post('/auth/facebook/signin', async function(req, res, next) {
  try {
    const { data } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['email'].join(', '),
        access_token: req.params.accessToken
      }
    });
    console.log(data)
    if (!data) {
      throw 'facebook login failed'
    }

    let user = await User.findOne({ email: data.email })
    if (!user) {
      throw 'user not found'
    }
    res.json({ result: true, token: user.token })
  } catch(err) {
    console.log(err)
    res.json({ result: false, error: err })
  }
})

router.post('/auth/google/signin', async function(req, res, next) {

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
