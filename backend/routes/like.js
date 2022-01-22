// import express
const express = require('express');
// configuration router express
const router = express.Router();
// import middleware d'authentification
const auth = require ('../middleware/auth')

// import like controllers
const likeCtrl = require('../controllers/like');



// route creation d'un like
router.post('/:id', auth, likeCtrl.createLike);

//route pour obtenir toutes les likes pour un post 
router.get('/:id', auth, likeCtrl.getAllLike);

//route pour supprimer un like
router.delete('/:id', auth, likeCtrl.deleteLike);

module.exports = router;