
// import du module fs de gestion des fichiers systeme
const fs = require('fs');
// import DB
const db = require('../modele/database');



// fonction qui renvoie la totalité des publications  presentes en BDD
exports.getAllPost = (req, res, next)=> {
  // requete BDD sur la table user join post et  envoie au client
  const sql = `SELECT user.user_id,user_nom,user_prenom,user_picture,post_id,post_text,post_date,post_picture
              FROM user
              JOIN post ON post.user_id = user.user_id
              ORDER BY post_date DESC `
  db.query(sql, function(err, results) {
      if (err){res.status(500).json({ err })}
      else {
      
        return res.status(200).json(results);
      }
    }
  )
}


     
// fonction de creation d'un nouveau post
exports.createPost = (req, res, next) => {
  const {user_id} = req.token ;
  const post_date = new Date();
  try{
    const post_text = JSON.parse(req.body.post);
    // creation objet post avec les données de la publication
    const post = {
      post_text,
      user_id,
      post_date,
      post_picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };
          try{
                // requete BDD sur la table user join post et  envoie au client
              const sql = `INSERT INTO post SET  ? `
              db.query(sql,post, function(err, results) {
                if (err){res.status(500).json({ err })}
                else {
                  // recuperation de l'id de l'objet crée en BDD
                  post.post_id=results.insertId;
                  return res.status(200).json(post)
                }
              })
          }
          catch (err){
              res.status(500).json({ err })
              console.log(err);
          }
  }
  catch (err){return res.status(500).json({ err }) }
 
}


     




// fonction pour supprimer un post
  exports.deletePost = (req, res, next) => {
    const {user_id} = req.token ;
    const post_id = req.params.id ;
    // requete BDD sur la table post pour recuperer l'url de l'image de la publication
    const sql = `SELECT post_picture 
              FROM post
              WHERE post_id = ? `
    db.query(sql,post_id, function(err, results) {
      if (err){res.status(500).json({ err })}
      else {  
              // recuperation du nom de l'image
              const oldPicture = results[0].post_picture.split('/images/')[1];
              // supressiond de l'image sur le serveur
              fs.unlink(`images/${oldPicture}`, () => {
                  // suppression du post en BDD
                  const sql = `DELETE FROM post
                              WHERE post_id=? `
                  db.query(sql,post_id, function(err, results) {
                      if (err){res.status(500).json({ err })}
                      else {
                            console.log(results);
                            return res.status(200).json( {message: "Post supprimé"})
                      }
                  })        
              })

      }
    })

  }



// fonction pour modifier une sauce 
    exports.updatePost = (req, res, next) => {
      const post_id = req.params.id ;
      // si presence d'un image
      if (req.file){
        post_picture= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        post_text = JSON.parse(req.body.post) 
        // requete BDD pour recuperer url ancienne image
        const sql = `SELECT post_picture 
                    FROM post
                    WHERE post_id = ? `
        db.query(sql,post_id, function(err, results) {
            if (err){res.status(500).json({ err })}
            else {
                // recuperation du nom de l'ancienne image
                const oldPicture = results[0].post_picture.split('/images/')[1];
                // suppression de l'ancienne image
                fs.unlink(`images/${oldPicture}`, () => {
                  // mise a jour du post en BDD avec nouvelle url image et nouveau texte
                  const sql = `UPDATE post
                              SET post_picture = ?, post_text = ?
                              WHERE post_id=? `
                  db.query(sql,[post_picture,post_text,post_id], function(err, results) {
                    if (err){res.status(500).json({ err })}
                    else {return res.status(200).json({post_picture, post_text})}
                  })        
                })
                
            }
        })
      }
      else {
        // pas de fichier image
        post_text = req.body.text
        // requete BDD pour mettre a jour le text du post
        const sql =`UPDATE post
                   SET post_text = ?
                   WHERE post_id=? `
        db.query(sql,[post_text,post_id], function(err, results) {
            if (err){res.status(500).json({ err })}
            else {return res.status(200).json({post_text})}
        })        
      }
    
    };

