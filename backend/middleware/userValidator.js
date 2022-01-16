
// regexp pour controler l'asbsence de caracteres spéciaux
const regexpName = /[^a-zA-Z0-9 _-]/;
// regexp pour verifier la conformaité de l'adresse email
const regexpEmail =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
// regexp pour verifier que le mot de passe a bien 8 caracteres, un nombre, une minuscule, une majuscule
const regexpPassword1 =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
// regexp pour vérifier que le mot de passe ne contient pas d'espace
const regexpPassword2=/\s/;

/*
* middleware verification du corps de la requete
* lors de la creation d'un utilisateur
* verification des différents champs avec les regexp 
* definis ci dessus
*/

module.exports = (req,res,next)=>{
    if (!req.body.user_nom ||!req.body.user_prenom ||!req.body.user_email||!req.body.user_password)
    { return res.status(400).json({error : "Merci de remplir tous les champs"}) };

    if (  regexpName.test(req.body.user_nom)  ||  regexpName.test(req.body.user_prenom ))
     { return res.status(400).json({error : " Le nom et le prénom ne doivent pas contenir de caracteres spéciaux"}) } ;

    if (!regexpEmail.test(req.body.user_email))
     { return res.status(400).json({error : "Merci de renseigner une adresse email valide"})} ;

    if (!regexpPassword1.test(req.body.user_password) || regexpPassword2.test(req.body.user_password))
      {return res.status(400).json({error : "Le mot de passe n'est pas assez fort"})}  
    next();
    
}
