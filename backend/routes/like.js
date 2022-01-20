// import express
const express = require('express');
// configuration router express
const router = express.Router();
// import middleware d'authentification
const auth = require ('../middleware/auth')

// import like controllers
const likeCtrl = require('../controllers/like');

/*
* Sur chaque route le middleware d'authentification est appelé
* Sur les routes de creation et de modification de sauce sont appelés
* les middlewares Multer et  validator 
* Sur la route DELETE et modification de sauce on appelle egalement SauceOwner   
*/

// route creation de post
router.post('/:id', auth, likeCtrl.createLike);

//route pour obtenir toutes les likes pour un post 
router.get('/:id', auth, likeCtrl.getAllLike);

//route pour supprimer un like
router.delete('/:id', auth, likeCtrl.deleteLike);

module.exports = router;