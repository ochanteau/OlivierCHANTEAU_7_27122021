// import express et mise en place
const express = require('express');
const app = express();
// import module Dotenv pour les varibales d'environnement
require("dotenv").config();

// import du module path 
const path = require('path');

// import  express-rate-limit
const rateLimit = require("express-rate-limit");
// import helmet 
const helmet = require('helmet');
//  import Morgan
const morgan = require('morgan');

// import des routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post')
const likeRoutes = require('./routes/like')
const commentRoutes = require('./routes/comments')



// middleware Morgan pour console.log les requetes et reponses serveurs
app.use(morgan('dev'));


/*
* Middleware helmet 
* configuration des en tetes HTPP liés à la sécurité
*/
app.use(helmet());


/*
* middleware express-rate-limit
* limitation des requetes provenant d'une même adresse IP 
*/
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500 // limit each IP to 300 requests per windowMs
}));


// middleware CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// middleware parsing req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// middleware de gestion des requetes d'obtention d'images
app.use('/images', express.static(path.join(__dirname, 'images')))

// middleware de routing
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;



