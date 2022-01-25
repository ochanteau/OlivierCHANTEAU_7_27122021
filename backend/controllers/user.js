// import du module bcrypt
const bcrypt = require ("bcrypt");
// import module Dotenv pour les varibales d'environnement
require("dotenv").config();
// import du module jwt
const jwt = require('jsonwebtoken');
// import DB
const db = require('../modele/database');
// import du module fs de gestion des fichiers systeme
const fs = require('fs');


exports.signup = async (req, res) => {
 
  try{
      // hashage du password avec bcrypt
      const hash = await bcrypt.hash(req.body.user_password, 10);
      // creation objet avec donnees du formualire et le password hash
      const user = {...req.body,user_password:hash};
      // requete bdd de creation d'un nouvelle utilisateur
      const sql = 'INSERT INTO user SET  ?';
      db.query(sql,user,
          function(err, results) {
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
      // requete BDD pour recuperer password et user_id en focntion de l'email 
      db.query(sql, user_email, function(err, results) {
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
  // requete BDD sur la table user et  envoie au client
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

exports.updatePicture =  (req, res) => {
    
    // recuperation de l'url de l'image
    const user_picture= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // requete BDD sur la table user pour récuperer l'url de l'ancienne image
    const sql = `SELECT user_picture FROM user WHERE user_id =? `;
    // recuperation user_id du token
    const {user_id} = req.token ;
    try{
      db.query(sql, user_id, function(err, results) {
        if (err){res.status(500).json({ err })}
        else {         
            // recuperation du nom de l'ancienne image
            const oldPicture = results[0].user_picture.split('/images/')[1];          
            // verification si l'ancienne image est l'image par défaut
            if (oldPicture=="profil.png") {
              // requete BDD sur la table user  pour mettre à jour l'url de l'image
              const sql = `UPDATE user SET user_picture='${user_picture}'WHERE user_id =? `
              db.query(sql, user_id, function(err, results) {
                if (err){res.status(500).json({ err })}
                else {
                    console.log(results);
                    return res.status(200).json(user_picture);
                  }
              })
            }
            else {
              // suppression de l'ancienne image
              fs.unlink(`images/${oldPicture}`, () => {
                // requete BDD sur la table user  pour mettre à jour l'url de l'image
                const sql = `UPDATE user SET user_picture='${user_picture}'WHERE user_id =? `
                db.query(sql, user_id, function(err, results) {
                    if (err){res.status(500).json({ err })}
                    else {
                      return res.status(200).json(user_picture);
                    }
                  })
              })
            }

        }       
      })
    }
    catch (err) {res.status(500).json({ err })}
}
  





// fonction pour supprimer le compte de l'utilisateur

exports.deleteAccount =  (req, res) => {
  // recuperation user_id du token
  const {user_id} = req.token ;
  // requete BDD sur la table user pour supprimer le compte
  const sql = ` DELETE FROM user WHERE user_id =? `
  db.query(sql, user_id, function(err, results) {
      if (err){res.status(500).json({ err })}
      else {
        console.log(results);
        return res.status(200).json({message:'Votre compte a bien été supprimé !'});
      }
    }
  )
}

 
