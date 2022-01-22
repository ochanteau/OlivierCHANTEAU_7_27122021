// import DB
const db = require('../modele/database');

/*
* middleware de comparaison de l'userId du token et 
* de l'userId du propriétaire du post 
*/
exports.postVerification = (req, res, next) => {
  // recuperation du userId dans le token
  const {user_id} = req.token ;
  // recupération de l'id du post dans le path de la requete
  const post_id = req.params.id ;
  // requete BDD sur la table post pour recuperer les droits de l utilisateur
  const sql = `SELECT droits_id
               FROM user
               WHERE user_id = ? `
  db.query(sql, user_id, function(err, results) {
    if (err){res.status(500).json({ err })}
    else {
          // si les droits utilisateurs sont égaux à 2 , cest un moderateur 
          if (results && results[0].droits_id ==2) {next();}
          // sinon verification que c est bien le propriétaire en BDD
          else {
            // requete BDD sur la table post pour recuperer user_id du propriétaire
            const sql2 = `SELECT user_id 
                          FROM post
                          WHERE post_id = ? `
            db.query(sql2, post_id, function(err, results) {
                if (err){res.status(500).json({ err })}
                else {
                    // si ce n'est pas le propriétaire reponse status 403
                    if (!results || results[0].user_id !=user_id) {res.status(403).json({ message:"Vous n'avez pas les droits necessaires"})}
                    else {next();}
                }
            }) 
          }
    }
  })
}




/*
* middleware de comparaison de l'userId du token et 
* de l'userId du propriétaire du commentaire
*/

exports.commentVerification = (req, res, next) => {
   // recuperation du userId dans le token
  const {user_id} = req.token ;
  // recupération de l'id du commentaire dans le path de la requete
  const comment_id = req.params.id ;
  console.log(user_id,comment_id)
  // requete BDD sur la table post pour recupererles droits de l utilisateur
  const sql = `SELECT droits_id
               FROM user
               WHERE user_id = ? `
  db.query(sql, user_id, function(err, results) {
    if (err){res.status(500).json({ err })}
    else {
      // si les droits utilisateurs sont égaux à 2 , cest un moderateur 
      if (results && results[0].droits_id ==2){ next();}
      // sinon verification que c est bien le propriétaire en BDD
      else {
            // requete BDD sur la table post pour recuperer user_id du propriétaire
            const sql2 = `SELECT user_id 
                          FROM comment
                          WHERE comment_id = ? `
            db.query(sql2, comment_id, function(err, results) {
                if (err){res.status(500).json({ err })}
                else {
                    // si ce n'est pas le propriétaire reponse status 403
                    if (!results || results[0].user_id !=user_id) {res.status(403).json({ message:"Vous n'avez pas les droits necessaires"})}
                    else {next ();}
                }
            }) 
      }
    }
  })

}






