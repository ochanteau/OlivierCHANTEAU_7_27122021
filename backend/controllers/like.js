// import DB
const db = require('../modele/database');



// fonction qui renvoie la totalité des likes presents en BDD pour un post
exports.getAllLike = (req, res, next)=> {
    const post_id = req.params.id;
    // requete BDD sur la table like avec le post_id et  envoie au client
    const sql = `SELECT *
                FROM groupomania.like
                WHERE post_id =?  `
    db.query(sql,post_id,function(err, results) {
        if (err){res.status(500).json({ err })}
        else {
            console.log(results)
          return res.status(200).json(results);
        }
      }
    )
  }


// fonction de creation d un like
exports.createLike = (req, res, next)=> {
    const post_id = req.params.id;
    const {user_id} = req.token ;
    // requete BDD sur la table like avec le post_id
    const sql = `SELECT *
                FROM groupomania.like
                WHERE post_id =?  `
    db.query(sql,post_id,function(err, results) {
        if (err){res.status(500).json({ err })}
        else {
            // verification si l'utilisateur n' a pas déja liké le post
            const index = results.findIndex(el => el.user_id == user_id);
            if (index==-1) {
                const like = {post_id,user_id}
                // requete BDD creation du like
                const sql = `INSERT INTO groupomania.like SET  ? `
                db.query(sql,like,function(err, results) {
                    if (err){res.status(500).json({ err })}
                    else {  
                            // insertion du nouvelle Id et envoie au client
                            like.like_id = results.insertId;
                            return res.status(200).json( {like} );
                    }
                })
            }
            else{res.status(403).json({ message: 'vous avez deja donner votre avis sur cette publication' })}
            
          
        }
      }
    )
  }


  // fonction pour supprimer un like
  exports.deleteLike = (req, res, next) => {
    const {user_id} = req.token ;
    const post_id = req.params.id ;
    // requete BDD pour supprimer le like
    const sql = `DELETE FROM groupomania.like
                WHERE post_id=? and user_id = ? `
    db.query(sql,[post_id,user_id], function(err, results) {
      if (err){res.status(500).json({ err })}
      else {
        return res.status(200).json( {message: "like supprimé"})
      }
    })

  }