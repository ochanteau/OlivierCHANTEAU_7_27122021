// import express
const express = require('express');
// configuration router express
const router = express.Router();
// import middleware d'authentification
const auth = require ('../middleware/auth')

// import middleware de comparaison de userId du token et du userId du propriétaire  en BD
const owner = require("../middleware/ownerValidation")


// import middlewares de controle des données pour la creation ou modification de post ou commentaires
const textVerification = require('../middleware/textVerification')
// import sauces controllers
const commentCtrl = require('../controllers/comment');

/*
* Sur chaque route le middleware d'authentification est appelé
* Sur les routes de creation et de modification de sauce sont appelés
* les middlewares Multer et  validator 
* Sur la route DELETE et modification de sauce on appelle egalement SauceOwner   
*/

// route creation de commentaire
router.post('/:id', auth, textVerification,  commentCtrl.createComment);

//route pour obtenir tous les commentaires
router.get('/:id', auth, commentCtrl.getAllComments);


// route pour modifier un commentaire

router.put('/:id',auth,owner.commentVerification,textVerification,commentCtrl.updateComment);

//route pour supprimer un commentaire
router.delete('/:id',auth,owner.commentVerification,commentCtrl.deleteComment);


module.exports = router;