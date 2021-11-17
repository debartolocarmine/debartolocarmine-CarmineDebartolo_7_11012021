const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
pool = require("../middleware/db.middleware");
// Crypto
// https://github.com/brix/crypto-js
const cryptojs = require('crypto-js');
const cryp64 = cryptojs.enc.Base64
// Variable d'environnement
require('dotenv').config();
// request
const User = require("../request/user.request");
// slugify
const slugify = require('../utils/slugify.utils');
//Fonction signup. 
//Méthode permettant à un utilisateur de s'inscrire.
exports.signup = (req, res, next) => {
  // HmacSHA512
  // Voir https://cryptojs.gitbook.io/docs/#hmac
  const cryptoEmail = cryptojs.HmacSHA512(req.body.email, process.env.ASK_TOKEN).toString(cryp64);
    //nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois.
    //il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré
    //https://www.npmjs.com/package/bcrypt

  let path_username = req.body.prenom + ' ' +  req.body.nom;

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      var userData = {
        email: cryptoEmail,
        password: hash,
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: slugify(path_username),
        portrait: null,
        status: 1,
        roles: req.body.role ? req.body.prenom : 'runner',
      };

      User.signUpUser(userData, (err, data) => {

        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while register."
          });
        else res.send({ email: req.body.email, pwd: req.body.password});

      });

    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error })
    });

};

//Fonction login. 
//Méthode permettant de vérifier si un utilisateur qui tente de se connecter dispose d'identifiants valides.
exports.login = (req, res, next) => {
  const cryptoEmail = cryptojs.HmacSHA512(req.body.email, process.env.ASK_TOKEN).toString(cryp64);
  //nous utilisons notre modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données.
  User.findOne({ email: cryptoEmail }, (err, data) => {
    //dans le cas contraire, nous renvoyons une erreur 500 Unauthorized.
        //si l'e-mail correspond à un utilisateur existant, nous continuons  
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while register."
      });
    else {
       //nous utilisons la fonction compare debcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données 
      bcrypt.compare(req.body.password, data.password)
        .then(valid => {
           //s'ils ne correspondent pas, nous renvoyons une erreur 401 Unauthorized et un message « Mot de passe incorrect ! » ;
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
           //nous utilisons la fonction sign de jsonwebtoken pour encoder un nouveau token
          const token = jwt.sign(
            //ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token) ;
            { uid: data.uid, roles: data.roles, status: data.status},
             //nous utilisons une chaîne secrète de développement temporaire  pour encoder notre token. 
            process.env.ASK_TOKEN,
            { expiresIn: '24h' }
          );

          res.status(200).json({
            user: {
              portrait: data.portrait,
              prenom: data.prenom,
              nom: data.nom,
              roles: data.roles,
              status: data.status,
              uid: data.uid,
              username: data.username,
            },
            token: token
          });

        })
        .catch(error => res.status(500).json({ error }));

    };
  });

};

exports.logout = (req, res, next) => {

  let tkn = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(tkn, process.env.ASK_TOKEN);

    const uid = decodedToken.uid;
    const role = decodedToken.role;

    const token = jwt.sign(
      { uid: uid, role: role  },
      process.env.ASK_TOKEN,
      { expiresIn: '1s' }
    );

    res.status(200).json();
  } catch (err) {
    res.status(401).json({msg : 'logout'});
  }

}

// tellMeAuth
exports.tellMeAuth = (req, res) => {
  console.log(req)
};

// loadAllUser
exports.loadAllUser = (req, res) => {

  // getAllBillets
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving article."
      });
    else {
      res.send(data);
    }
  });

};

// profile
exports.profile = (req, res) => {
  // getOneBilletById
  User.getOne(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with uid ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving user with uid ${req.params.username}.`
        });
      }
    } else res.send(data);
  });
};

// updateOneUser
exports.updateOneUser = (req, res) => {

  const { username } = req.params;

  console.log(req)
};


exports.desactiveOneUser = (req, res) => {};