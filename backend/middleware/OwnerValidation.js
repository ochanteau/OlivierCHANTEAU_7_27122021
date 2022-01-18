// import DB
const db = require('../modele/database');

/*
* middleware de comparaison de l'userId du token et 
* de l'userId du propriétaire du post 
*/
exports.postVerification = (req, res, next) => {
  
  const {user_id} = req.token ;
  const post_id = req.params.id ;

  // requete BDD sur la table post pour recupererles droits de l utilisateur
  const sql = `SELECT droits_id
               FROM user
               WHERE user_id = ? `
  db.query(sql, user_id, function(err, results) {
    if (err){res.status(500).json({ err })}
    else {
      // console.log(results[0].droits_id)
      if (results && results[0].droits_id ==2)
         { next();}
      else {
      
          // requete BDD sur la table post pour recuperer user_id du propriétaire
        const sql2 = `SELECT user_id 
        FROM post
        WHERE post_id = ? `
        db.query(sql2, post_id, function(err, results) {
            if (err){res.status(500).json({ err })}
            else {
                  // console.log(results[0].user_id)
                if (!results || results[0].user_id !=user_id) {res.status(403).json({ message:"Vous n'avez pas les droits necessaires"})}
              else {console.log("next");
                next ();}
            }
        }) 
      }
    }
  })



  // requete BDD sur la table post pour recuperer user_id du propriétaire
  // const sql2 = `SELECT user_id 
  //              FROM post
  //              WHERE post_id = ? `
  // db.query(sql2, post_id, function(err, results) {
  //     if (err){res.status(500).json({ err })}
  //     else {
  //       console.log(results[0].user_id)
  //       if (!results || results[0].user_id !=user_id) {res.status(403).json({ message:"Vous n'avez pas les droits necessaires"})}
  //       else {
  //          // next ()
  //       return res.status(200).json("ok");
  //       }
        
  //     }
  //   }
  // )
    
};


/*
* middleware de comparaison de l'userId du token et 
* de l'userId du propriétaire du commentaire
*/

exports.commentVerification = (req, res, next) => {
  
  const {user_id} = req.token ;
  const comment_id = req.params.id ;
  console.log(comment_id)
  // requete BDD sur la table post pour recupererles droits de l utilisateur
  const sql = `SELECT droits_id
               FROM user
               WHERE user_id = ? `
  db.query(sql, user_id, function(err, results) {
    if (err){res.status(500).json({ err })}
    else {
      console.log(results[0].droits_id)
      if (results && results[0].droits_id ==2)
         {  // next ()
          return res.status(200).json("ok");}
      else {
      
          // requete BDD sur la table post pour recuperer user_id du propriétaire
        const sql2 = `SELECT user_id 
        FROM comments
        WHERE comment_id = ? `
        db.query(sql2, comment_id, function(err, results) {
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
      }
    }
  })

}














// exports.commentVerification = (req, res, next) => {
  
//   const {user_id} = req.token ;
//   const comment_id = req.params.id ;
//   console.log(comment_id)
//   // requete BDD sur la table post pour recuperer user_id du propriétaire
//   const sql = `SELECT user_id 
//                FROM comments
//                WHERE comment_id = ? `
//   db.query(sql, comment_id, function(err, results) {
//       if (err){res.status(500).json({ err })}
//       else {
//         console.log(results[0].comment_id)
//         if (!results || results[0].comment_id !=user_id) {res.status(403).json({ message:"Vous n'avez pas les droits necessaires"})}
//         else {
//            // next ()
//         return res.status(200).json("ok");
//         }
        
//       }
//     }
//   )

    
// }