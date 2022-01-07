// import du module bcrypt
const bcrypt = require ("bcrypt");
// import module Dotenv pour les varibales d'environnement
require("dotenv").config();
// import du module jwt
const jwt = require('jsonwebtoken');
// import DB
const db = require('../modele/database')






// fonction pour s'inscrire

exports.signup = async (req, res) => {
 
    try{
        const hash = await bcrypt.hash(req.body.user_password, 10);
        const user = {...req.body,user_password:hash, droits_id : 1};
        console.log(user);
        db.query('INSERT INTO user SET  ?',user,
            function(err, results) {
              console.log(results);
              if (err){ res.status(400).json({ message: "L'enregistrement à échoué",err })}
              else {res.status(201).json({ message: 'Utilisateur créé !' })}
            }
          );
  
    }
    catch (err){res.status(500).json({ message: "l'enregistrement à échoué",err })
      console.log(err);
  
    }
  
  };
   

// fonction pour se loguer

exports.login =  (req, res) => {
    
      db.query(
        'SELECT user_password, user_id FROM user WHERE user_email=?', req.body.user_email,
        function(err, results) {
          if (err){res.status(500).json({ err })}
          else if ( results && results.length < 1){return res.status(401).json({ error: 'Utilisateur non trouvé !' });}
          else { 

              const {user_password, user_id} = results[0];
              
              // verification password de la requete et password base de donnée
              bcrypt.compare(req.body.user_password, user_password)
              .then(valid => {
                
                // si non concordant :envoie d'une  erreur 401
                if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                // si valide , envoie d'une reponse 200 avec le token authentification
                res.status(200).json({
                  user_id,
                  token: jwt.sign(
                    { user_id },
                    `${process.env.USER_TOKEN}`,
                    { expiresIn: '24h' }
                  )
                });
              })
              .catch(error => res.status(500).json({ error }));
              }

        }
      );
};

// fonction pour obtenir les infos sur l'utilisateur courant
// exports.getCurrentUser =  (req, res) => {
//   const {user_id} = req.token ;
//   console.log(user_id);
//   db.query(
//     'SELECT `user_nom`, `user_prenom`, `user_email` FROM user WHERE user_id=?', user_id,
//     function(err, results) {
//       if (err){res.status(500).json({ err })}
//       else {
//         console.log(results);
//         return res.status(200).json(results[0]);
//       }
//     }
//   )

  
// }

// exports.getCurrentUser =  (req, res) => {
//   const {user_id} = req.token ;
//   console.log(user_id);
//   db.query(
//     'SELECT `user_nom`, `user_prenom`, `user_email`,`profil_picture_url`FROM user JOIN `profil_picture` ON `user`.`profil_picture_id` = `profil_picture`.`profil_picture_id`', 
//     function(err, results) {
//       if (err){res.status(500).json({ err })}
//       else {
//         console.log(results);
//         return res.status(200).json(results[0]);
//       }
//     }
//   )

  
// }


exports.getCurrentUser =  (req, res) => {
  const {user_id} = req.token ;
  console.log(user_id);
  db.query(
    `SELECT user_nom, user_prenom, user_email,profil_picture_url
    FROM user, profil_picture
    WHERE user.profil_picture_id = profil_picture.profil_picture_id
    AND user.user_id =? `, user_id,
    function(err, results) {
      if (err){res.status(500).json({ err })}
      else {
        console.log(results);
        return res.status(200).json(results[0]);
      }
    }
  )

  
}


// 'SELECT `user_nom`, `user_prenom`, `user_email`,`profil_picture_url`
// FROM user 

// JOIN `profil_picture` ON `user`.`profil_picture_id` = `profil_picture`.`profil_picture_id`';

`SELECT user_nom, user_prenom, user_email,profil_picture_url
FROM user, profil_picture
WHERE user.profil_picture_id = profil_picture.profil_picture_id
AND user.user_id = '43' `