// import du module fs de gestion des fichiers systeme
const fs = require('fs');


/*
* fonction de verification des données saisies par l'utilisateur
*   
*/ 
function verifyText(text) {
    if (!text || /[$^*<>``]/.test(text) ){return true}
    else {return false}
}


/* fonction de suppression de l'image associé à la requete et reponse à la requete
*  @param req
*  @param res
*/

function deletePicture (req,res){
    
    if (req.file) {
        const filename = req.file.path;
        fs.unlink(`${filename}`, () => {res.status(400).send(new Error('Bad request!'));}
            )
    }
    else {res.status(400).send(new Error('Bad request!'));}
    
}

/*
* middleware de verification des donnees utilisateurs 
* lors de la creation d'un post ou d'un commentaire
*/

module.exports = (req,res,next) => {
        // assignation du body de la requete en fonction du content type
        try{
            const text = req.file? JSON.parse(req.body.post) : req.body.text;
            console.log(text)
            // verification des données saisies par l'utilisateur
            if (verifyText(text)) {deletePicture(req,res)}
            else { next();} 
        }
        catch (err){
            res.status(500).json({ err })
        }
        
}
    





