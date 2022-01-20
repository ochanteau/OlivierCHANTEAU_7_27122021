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




// connection à la base de donnée
// const db = require('./modele/database')
// voir pour try catch
// db.connect(function(err) {
//   if (err) throw err;
//   console.log("Connecté à la base de données MySQL!");
// });

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

// db.query(
//     'SELECT user_password, user_id FROM user WHERE user_email=?', 'quentin@gmail.com',
//     function(err, results) {
//       console.log(results); // results contains rows returned by server
//       console.log(results.length); // results contains rows returned by server
//       console.log(results[0]); // results contains rows returned by server
//       console.log(results[0].user_password); // results contains rows returned by server

//       console.log(err); // fields contains extra meta data about results, if available
//     }
//   );



// test

// import du module bcrypt
// const bcrypt = require ("bcrypt");

// bcrypt.hash("test", 10)
//       .then(hash => {
//         console.log(hash);
//         const email = 'cha23@dzdz.com';
//         const nom  = "test";
//         const prenom = "test";
//         const password= hash;
       
//         const user = {email,nom,prenom,password,droits_id:1};

//         console.log(user);

//  (  `nom`, `prenom`, `email`, `password`, `droits_id`)
//         db.query(
//           'INSERT INTO user SET  ?',user,
//           function(err, results) {
//           console.log(results); // results contains rows returned by server
//           console.log(err); // fields contains extra meta data about results, if available
//           }
//         );
//       })
//       .catch(error => console.log(error));



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
// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 500 // limit each IP to 300 requests per windowMs
// }));


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

module.exports = app;



