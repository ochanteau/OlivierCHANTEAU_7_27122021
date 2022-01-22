// import express
const express = require('express');
// configuration router express
const router = express.Router();
// import middleware d'authentification
const auth = require ('../middleware/auth')

// import middleware de comparaison de userId du token et du userId du propriétaire  en BD
const owner = require("../middleware/ownerValidation")

// import middleware multer pour gerer les images
const multer = require('../middleware/multer-config');

// import middlewares de controle des données pour la creation ou modification de post ou commentaires
const textVerification = require('../middleware/textVerification')
// import sauces controllers
const postCtrl = require('../controllers/post');

/*
* Sur chaque route le middleware d'authentification est appelé
* Sur les routes de creation et de modification de post sont appelés
* les middlewares Multer et  textVerification
* Sur la route DELETE et modification de post on appelle egalement owner 
*/

// route creation de publication
router.post('/', auth, multer, textVerification,  postCtrl.createPost);

//route pour obtenir toutes les publications
router.get('/', auth, postCtrl.getAllPost);


// route pour modifier une publication
router.put('/:id',auth,owner.postVerification,multer, textVerification,postCtrl.updatePost);

//route pour supprimer une publication
router.delete('/:id',auth,owner.postVerification,postCtrl.deletePost);


module.exports = router;