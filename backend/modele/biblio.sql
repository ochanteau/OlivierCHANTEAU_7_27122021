CREATE TABLE `foodly`.`user` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) NOT NULL,
    `user_nom` VARCHAR(45) NOT NULL,
    `user_prenom` VARCHAR(45) NOT NULL,
    `user_password` VARCHAR(45) NOT NULL,
    `droits_id` INT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE INDEX `email_UNIQUE` (`user_email` ASC) VISIBLE);


// 

INSERT INTO `user` ( `iduser`, `nom`, `prenom`, `email`, `password`, `droits_id`)

    VALUES
    
    ( 'bernard','quentin', 'quentin@gmail.com', 'test', '1');


// 

SELECT * FROM user WHERE user_mail=?;

// 
SELECT `user_nom`, `user_prenom`, `user_email` FROM user WHERE user_id=14;
// 

http://localhost:3000/images/profil.png

// 
SELECT *
FROM user 

JOIN `profil_picture` ON `user`.`profil_picture_id` = `profil_picture`.`profil_picture_id`;

// 

SELECT `user_nom`, `user_prenom`, `user_email`,`profil_picture_url`
FROM user 

JOIN `profil_picture` ON `user`.`profil_picture_id` = `profil_picture`.`profil_picture_id`;

// 

`SELECT user_nom, user_prenom, user_email,profil_picture_url
FROM user, profil_picture
WHERE user.profil_picture_id = profil_picture.profil_picture_id
AND user.user_id = '43' `


-- selection des POST plus infos user 
SELECT user.user_id,user_nom,user_prenom,user_picture,post_id,post_text,post_date,post_picture
FROM user
JOIN post ON post.user_id = user.user_id
ORDER BY post_date DESC

-- selection des commentaires relatifs à un post avec les infos de la personne qui a posté
SELECT user.user_id,user_nom,user_prenom,user_picture,comment_id,comment_text,comment_date,post_id
FROM user
INNER JOIN comments
WHERE comments.user_id = user.user_id AND post_id=2
ORDER BY comment_date DESC

-- selction des likes relatif à un POST 

SELECT * FROM groupomania.like
WHERE post_id =2