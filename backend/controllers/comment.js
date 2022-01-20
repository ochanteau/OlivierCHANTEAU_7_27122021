// import DB
const db = require('../modele/database');



// fonction qui renvoie la totalité des commentaires pour un post
exports.getAllComments= (req, res, next)=> {

  // requete BDD sur la table user join post et  envoie au client
  const post_id = req.params.id;
  const sql = `SELECT user.user_id,user_nom,user_prenom,user_picture,comment_id,comment_text,comment_date,post_id
                FROM user
                INNER JOIN comment
                WHERE comment.user_id = user.user_id AND post_id=?
                ORDER BY comment_date ASC `
  db.query(sql,post_id, function(err, results) {
      if (err){res.status(500).json({ err })}
      else {
        // console.log(results);
        return res.status(200).json(results);
      }
    }
  )
}


     
// fonction de creation d'un nouveau commentaire
exports.createComment = (req, res, next) => {
  const {user_id} = req.token ;
  const post_id = req.params.id;
  console.log(req.body.text);
  const comment_date = new Date();
  console.log(comment_date)  
  const comment_text = req.body.text
  console.log(comment_text)
  const comment = {comment_text,user_id,comment_date,post_id};
  console.log(comment);
  // requete BDD sur la table user join post et  envoie au client
  const sql = `INSERT INTO comment SET  ? `
  db.query(sql,comment, function(err, results) {
    if (err){res.status(500).json({ err })}
    else {
        console.log(results);
        comment.comment_id=results.insertId;
        console.log(comment);
        return res.status(200).json(comment)
    }
  })
}
          




// fonction pour supprimer un commentaire
  exports.deleteComment = (req, res, next) => {
    const {user_id} = req.token ;
    const comment_id = req.params.id ;
    console.log(user_id, comment_id)
    const sql = `DELETE FROM comment
                    WHERE comment_id=? `
    db.query(sql,comment_id, function(err, results) {
        if (err){res.status(500).json({ err })}
        else {
              console.log(results);
              return res.status(200).json( {message: "commentaire supprimé"})
        }
    })

}











// fonction pour modifier un commentaire
    exports.updateComment = (req, res, next) => {
      const comment_id = req.params.id ;
      comment_text = req.body.text  
      console.log(comment_text)
      const sql =`UPDATE comment
                   SET comment_text = ?
                   WHERE comment_id=? `  
      db.query(sql,[comment_text,comment_id], function(err, results) {
        if (err){res.status(500).json({ err })}
        else {
            console.log(results);
            return res.status(200).json({comment_text})
        }
      })     

        
              
     
};


