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
// const userRoutes = require('./routes/user');
// const saucesRoutes = require('./routes/sauces')




// connection à la base de donnée
const db = require('./modele/database')
// voir pour try catch
db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

// try{db.connect();
//   console.log("Connecté à la base de données MySQL!");
// } catch{ }



// simple query
// db.query(
//   'SELECT * FROM `aliment`',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(err); // fields contains extra meta data about results, if available
//   }
// );


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
  max: 300 // limit each IP to 300 requests per windowMs
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
// app.use('/api/auth', userRoutes);
// app.use('/api/sauces', saucesRoutes);

module.exports = app;



