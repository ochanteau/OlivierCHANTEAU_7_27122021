// import DB
const db = require('../modele/database');

/*
* middleware de comparaison de l'userId du token et 
* de l'userId du propriétaire du post 
*/
exports.postVerification = (req, res, next) => {
  
  const {user_id} = req.token ;
  const post_id = req.params.id ;
  console.log(post_id)
  // requete BDD sur la table post pour recuperer user_id du propriétaire
  const sql = `SELECT user_id 
               FROM post
               WHERE post_id = ? `
  db.query(sql, post_id, function(err, results) {
      if (err){res.status(500).json({ err })}
      else {
        console.log(results[0].user_id)
        if (!results || results[0].user_id !=user_id) {res.status(403).json({ message:"Vous n'avez pas les droits necessaires"})}
        else {
           // next ()
        return res.status(200).json("ok");
        }
        
      }
    }
  )
    
};


/*
* middleware de comparaison de l'userId du token et 
* de l'userId du propriétaire du post 
*/
exports.commentVerification = (req, res, next) => {
  
  const {user_id} = req.token ;
  const comment_id = req.params.id ;
  console.log(comment_id)
  // requete BDD sur la table post pour recuperer user_id du propriétaire
  const sql = `SELECT user_id 
               FROM comments
               WHERE comment_id = ? `
  db.query(sql, comment_id, function(err, results) {
      if (err){res.status(500).json({ err })}
      else {
        console.log(results[0].comment_id)
        if (!results || results[0].comment_id !=user_id) {res.status(403).json({ message:"Vous n'avez pas les droits necessaires"})}
        else {
           // next ()
        return res.status(200).json("ok");
        }
        
      }
    }
  )

    
};