// import du module bcrypt
const bcrypt = require ("bcrypt");
// import module Dotenv pour les varibales d'environnement
require("dotenv").config();
// import du module jwt
const jwt = require('jsonwebtoken');
// import DB
const db = require('../modele/database');



exports.signup = async (req, res) => {
 
  try{
      const hash = await bcrypt.hash(req.body.user_password, 10);
      const user = {...req.body,user_password:hash};
      console.log(user);
      const sql = 'INSERT INTO user SET  ?';
      db.query(sql,user,
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
      const sql= 'SELECT user_password, user_id FROM user WHERE user_email=?';
      const user_email =  req.body.user_email;
      db.query(
        sql, user_email,
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
exports.getCurrentUser =  (req, res) => {
  // recuperation user_id du token
  const {user_id} = req.token ;
  console.log(user_id);
  // requete BDD sur la table user et la table profil_picture et envoie au client
  const sql = `SELECT user_nom, user_prenom, user_email,user_picture, droits_id
              FROM user
              WHERE user_id =? `
  db.query(sql, user_id, function(err, results) {
      if (err){res.status(500).json({ err })}
      else {
        console.log(results);
        return res.status(200).json({currentUser:results[0],user_id});
      }
    }
  )

  
}





// fonction pour modifier l'image de l'utilisateur courant

exports.putPicture =  (req, res) => {
  console.log(req.body.image);
  // console.log(JSON.parse(req.body.user));
  res.status(200).json("ok");
}