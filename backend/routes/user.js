// import express
const express = require('express');
// configuration router express
const router = express.Router();
// import middleware de controle Mail et mot de passe
const userValidator = require('../middleware/userValidator');
// import middleware pour limiter le nombre de requete avec la meme IP
const accountLimiter = require('../middleware/rate-limit-config');
// import users controllers 
const userCtrl = require('../controllers/user');
// import middleware d'authentification
const auth = require ('../middleware/auth')
// import multer 
const multer = require ('../middleware/multer-config')


/*
* route "/signup", appel des middlewares pour limiter le nombre de creation de compte avec la meme IP,
* pour verifier nom,prenom,mail et MDP, et du controllers "signup"
*/
router.post('/signup',accountLimiter.createAccountLimiter , userValidator, userCtrl.signup);


/*
* route "/login", appel des middlewares pour limiter le nombre de login  avec la meme IP,
* et du controllers "login"
*/
router.post('/login', accountLimiter.loginAccountLimiter, userCtrl.login);

/*
* route "/picture", appel du middleware auth pour verifier le token et recuperer user_id ,
* de multer pour recuper le fichier 
* et du controller pour modifier l'image
*/
router.put('/picture',auth,multer, userCtrl.updatePicture);


/*
* route "/currentUser", appel du middleware auth pour verifier le token et recuperer user_id ,
* et du controller pour recuperer les infos de l'utilisateur
*/
router.get('/currentUser',auth, userCtrl.getCurrentUser);

/*
* route "/delete", appel du middleware auth pour verifier le token et recuperer user_id ,
* et du controller pour surpprimer le compte de l'utilisateur
*/
router.delete('/delete',auth, userCtrl.deleteAccount);


module.exports = router;