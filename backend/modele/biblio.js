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