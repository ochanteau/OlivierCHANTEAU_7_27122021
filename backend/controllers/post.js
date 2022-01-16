
// import du module fs de gestion des fichiers systeme
const fs = require('fs');
// import DB
const db = require('../modele/database');



// fonction qui renvoie la totalité des posts presents en BDD
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
  console.log(req.body.post);
  const post_date = new Date();
  console.log(post_date)
  try{
    
    const post_text = JSON.parse(req.body.post);
    console.log(post_text)
    // const post_text =  req.body.post;
    const post = {
      post_text,
      user_id,
      post_date,
      post_picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };
    console.log(post);
          try{
                // requete BDD sur la table user join post et  envoie au client
              const sql = `INSERT INTO post SET  ? `
              db.query(sql,post, function(err, results) {
                if (err){res.status(500).json({ err })}
                else {
                console.log(results);
                post.post_id=results.insertId;
                console.log(post);
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


// fonction qui renvoie la sauce correspondant à l'id de la requete
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}
     




// fonction pour supprimer une sauce
    exports.deleteSauce = (req, res, next) => {
      // recherche de la sauce en BD
      Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          // suppression de l'image associé sur le serveur
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            // suppression de la sauce en BD
            Sauce.deleteOne({ _id: req.params.id })
             
              .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
              .catch(error => res.status(400).json({ error }));
          });
        })
        .catch(error => res.status(500).json({ error }));
    };



// fonction pour modifier une sauce 
    exports.modifySauce = (req, res, next) => {
      // verification de la presence d'une nouvelle image
      if (req.file) {
        // parsing req.body.sauce
        const sauceObject = {...JSON.parse(req.body.sauce),imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
        // recherche de la sauce en BD
        Sauce.findOne({ _id: req.params.id })
          .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            // suppression de l'image associé sur le serveur
            fs.unlink(`images/${filename}`, () => {
              // MAJ de la sauce en BD
              Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
              .catch(error => res.status(400).json({ error }));
          });
        })
          .catch(error => res.status(500).json({ error }))
      }
      // si pas de nouvelle image dans la requete, MAJ de la sauce en BD
      else {Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }))}
    };




// fonction pour like-dislike une sauce
exports.likeDislike = (req, res, next) => {
    //  comparaison userId du body de la requete et userId du token
    if (req.body.userId && req.body.userId === req.token.userId) {
      // switch case en fonction de la valeur du req.body.like (1,-1,0)
      switch (req.body.like) {

        // cas 1 : like
        case 1 :
          // recherche de la sauce en BD
          Sauce.findOne({ _id: req.params.id })
          .then(sauce=>{
            // verification si le userId a déja été utilisé pour liker ou disliker
            if (sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId)  ) {
              res.status(403).json({ message: 'vous avez déja partagé votre avis pour cette sauce !'});
              
            }
            // si ce n'est pas le cas MAJ de la sauce en BD
            else {
              // incrementation du nb de like et ajout du userId à l'array usersLiked
              Sauce.updateOne({ _id: req.params.id }, { $inc: {likes: 1 }, $push : {usersLiked:req.body.userId}})
              .then(() => {
                res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'})
              })
              .catch(error => res.status(400).json({ error }));
            }

          })
          .catch(error => res.status(500).json({ error }));
          break;

        // cas -1 : dislike
        case -1 :
          // recherche de la sauce en BD
          Sauce.findOne({ _id: req.params.id })
          .then(sauce=>{
            // verification si le userId a déja été utilisé pour liker ou disliker
            if (sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId)  ) {
              res.status(403).json({ message: 'vous avez déja partagé votre avis pour cette sauce !'});
            }
            // si ce n'est pas le cas MAJ de la sauce en BD
            else {
              // incrementation du nb de dislike et ajout du userId à l'array usersDisliked
              Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: 1 }, $push : {usersDisliked:req.body.userId}})
              .then(() => {
                res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'})
              })
              .catch(error => res.status(400).json({ error }));
            }

          })
          .catch(error => res.status(500).json({ error }));
          break;
          
        // cas 0 : annulation du like ou du dislike
        case 0 :
          // recherche de la sauce en BD
          Sauce.findOne({ _id: req.params.id })
          .then( sauce=>{
            // si userId present dans le tableau req.body.userId
            if (sauce.usersLiked.includes(req.body.userId)) {
              // maj de la sauce en enlevant 1 au liked et en supprimant le userId du tableau usersLiked
              Sauce.updateOne({ _id: req.params.id }, {$inc: {likes: -1 }, $pull : {usersLiked:req.body.userId}})
                .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
                .catch(error => res.status(400).json({ error }));
            }
            // si userId non present dans le tableau req.body.userId
            else {
              // maj de la sauce en enlevant 1 au disliked et en supprimant le userId du tableau usersDisliked
              Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: -1 }, $pull : {usersDisliked:req.body.userId}})
                .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
                .catch(error => res.status(400).json({ error }));
            }
          })
          .catch(error => res.status(500).json({ error }));
          break;
        
        default:
          res.status(400).json({ message: 'Invalid request!'});
          
      }
    }

    else {res.status(403).json({
      error: new Error('Invalid request!')
    });}


};