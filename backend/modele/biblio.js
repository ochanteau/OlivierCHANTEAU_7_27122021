CREATE TABLE `foodly`.`user` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) NOT NULL,
    `user_nom` VARCHAR(45) NOT NULL,
    `user_prenom` VARCHAR(45) NOT NULL,
    `user_password` VARCHAR(45) NOT NULL,
    `droits_id` INT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE INDEX `email_UNIQUE` (`user_email` ASC) VISIBLE);

INSERT INTO `user` ( `iduser`, `nom`, `prenom`, `email`, `password`, `droits_id`)

    VALUES
    
    ( 'bernard','quentin', 'quentin@gmail.com', 'test', '1');