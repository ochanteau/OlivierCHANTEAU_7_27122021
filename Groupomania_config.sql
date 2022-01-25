-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `groupomania` ;

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`admin` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`admin` (
  `admin_id` INT NOT NULL,
  `admin_rights` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`admin_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`user` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(90) NOT NULL,
  `user_nom` VARCHAR(90) NOT NULL,
  `user_prenom` VARCHAR(90) NOT NULL,
  `user_password` VARCHAR(90) NOT NULL,
  `droits_id` INT NOT NULL DEFAULT '1',
  `user_picture` VARCHAR(255) NOT NULL DEFAULT 'http://localhost:3000/images/profil.png',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`user_email` ASC) VISIBLE,
  INDEX `droits_id_idx` (`droits_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 81
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`post` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`post` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `post_text` LONGTEXT NOT NULL,
  `post_picture` VARCHAR(90) NOT NULL,
  `post_date` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`post_id`),
  INDEX `fk_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `groupomania`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`comment` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `comment_text` MEDIUMTEXT NOT NULL,
  `comment_date` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_post_id_idx` (`post_id` ASC) VISIBLE,
  INDEX `fk_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES `groupomania`.`post` (`post_id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_user_id2`
    FOREIGN KEY (`user_id`)
    REFERENCES `groupomania`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 49
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`like` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`like` (
  `like_id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`like_id`),
  INDEX `fk_post_id2_idx` (`post_id` ASC) VISIBLE,
  INDEX `fk_user_id3_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_id2`
    FOREIGN KEY (`post_id`)
    REFERENCES `groupomania`.`post` (`post_id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_user_id3`
    FOREIGN KEY (`user_id`)
    REFERENCES `groupomania`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
