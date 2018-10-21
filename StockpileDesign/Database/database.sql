-- MySQL Script generated by MySQL Workbench
-- Sat Oct 20 21:43:21 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `userID` VARCHAR(16) NOT NULL,
  `loginID` VARCHAR(45) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `PermissionsLevel` VARCHAR(45) NOT NULL,
  `StreetAddress` VARCHAR(45) NOT NULL,
  `City` VARCHAR(45) NOT NULL,
  `State` VARCHAR(45) NOT NULL,
  `ZipCode` INT NOT NULL,
  `DeliveryInstructions` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB;

INSERT INTO Users (userID, loginID, password, PermissionsLevel, StreetAddress, City, State, ZipCode, DeliveryInstructions, email, create_time)
INSERT INTO Users (,"admin","password","admin","54 Red Street","New York City","New York", 10027,"Drop on porch", "spiderman@marvelheroes.org", ?)

INSERT INTO Users (,"Bruce Banner","hulk","customer","123 Green Street","Dayton","Ohio", 45377,"Drop on porch", "hulk@marvelheroes.org", ?)
INSERT INTO Users (,"Anthony Stark","ironman","customer","456 Red Lane","Long Island","New York", 11101,"Signature required", "ironman@marvelheroes.org", ?)
INSERT INTO Users (,"Steve Rogers","captainamerica","customer","159 Blue Drive","New York City","New York", 10087,"Call before delivery", "captainamerica@marvelheroes.org", ?)
INSERT INTO Users (,"Stephen Strange","dorctorstrange","customer","753 Purple Street","Philadelphia","Pennsylvania", 19135,"Signature required", "doctorstrange@marvelheroes.org", ?)
INSERT INTO Users (,"Peter Parker","spiderman","customer","54 Red Street","New York City","New York", 10027,"Drop on porch", "spiderman@marvelheroes.org", ?)
INSERT INTO Users (,"Scott Lang","antman","customer","4876 Anthony Drive","Coral Gables","Florida", 33134,"Call before delivery", "antman@marvelheroes.org", ?)
INSERT INTO Users (,"Peter Quill","starlord","customer","6698 Space Lane","St. Charles","Missouri", 63302,"Call before delivery, I may be way, way out.", "starlord@marvelheroes.org", ?)
INSERT INTO Users (,"Wade Wilson","deadpool","customer","9855 Undead Stree","New York City","New York", 10115,"Signature required", "deadpool@marvelheroes.org", ?)
INSERT INTO Users (,"Logan Wilson","wolverine","customer","1407 Graymalkin Lane","Salem Center","New York", 10560,"Drop on porch", "wolverine@marvelheroes.org", ?)

-- -----------------------------------------------------
-- Table `mydb`.`UserOrderProduct`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`UserOrderProduct` (
  `UserID` INT NOT NULL,
  `OrderID` INT NOT NULL,
  `ProductID` INT NOT NULL,
  `Quantity` INT NOT NULL,
  `Price` DECIMAL(2) GENERATED ALWAYS AS () VIRTUAL,
  `DiscountPrice` DECIMAL(2) NOT NULL,
  `Users_userID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UserID`, `OrderID`, `ProductID`),
  INDEX `fk_UserOrderProduct_Users1_idx` (`Users_userID` ASC) VISIBLE,
  CONSTRAINT `fk_UserOrderProduct_Users1`
    FOREIGN KEY (`Users_userID`)
    REFERENCES `mydb`.`Users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Products` (
  `ProductID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Brand` VARCHAR(45) NOT NULL,
  `Type` VARCHAR(45) NOT NULL,
  `Price` DECIMAL(2) NOT NULL,
  `Material` VARCHAR(45) NOT NULL,
  `Image` VARCHAR(45) NOT NULL,
  `Discription` VARCHAR(45) NOT NULL,
  `Dimensions` VARCHAR(45) NOT NULL,
  `Stock` INT NOT NULL,
  `UserOrderProduct_UserID` INT NOT NULL,
  `UserOrderProduct_OrderID` INT NOT NULL,
  `UserOrderProduct_ProductID` INT NOT NULL,
  PRIMARY KEY (`ProductID`),
  INDEX `fk_Products_UserOrderProduct1_idx` (`UserOrderProduct_UserID` ASC, `UserOrderProduct_OrderID` ASC, `UserOrderProduct_ProductID` ASC) VISIBLE,
  CONSTRAINT `fk_Products_UserOrderProduct1`
    FOREIGN KEY (`UserOrderProduct_UserID` , `UserOrderProduct_OrderID` , `UserOrderProduct_ProductID`)
    REFERENCES `mydb`.`UserOrderProduct` (`UserID` , `OrderID` , `ProductID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO Products (ProductID, Name, Brand, Type, Price, Material, Image, Description, Dimensions, Stock)

INSERT INTO Products (?, ?, "Hemnes", "Bed frame", 199.00, "Oak", ?, "A bed frame.", "74.5 x 38 x 7 inches", 5)
INSERT INTO Products (?, ?, "Hemnes", "Bed frame", 484.00, "Oak", ?, "Another bed frame.", "75 x 37.5 x 7 inches", 5)
INSERT INTO Products (?, ?, "Hasselvika", "Bed frame", 449.00, "Oak", ?, "The best bed frame.", "74.5 x 37.5 x 7.5 inches", 5)
INSERT INTO Products (?, ?, "Hasselvika", "Bed frame", 379.00, "Oak", ?, "Not too shabby bed frame.", "74 x 38 x 7.5 inches", 5)
INSERT INTO Products (?, ?, "Vedbo", "Bed frame", 389.00, "Oak", ?, "My very favorite!.", "74.5 x 38.5 x 7.5 inches", 5)

INSERT INTO Products (?, ?, "Jappling", "Chair", 169.00, "Oak", ?, "A cool chair.", "25 x 29.5 x 31 inches", 5)
INSERT INTO Products (?, ?, "Vedbo", "Chair", 199.99, "Oak", ?, "A fancy chair.", "25.5 x 30 x 30.5 inches", 5)
INSERT INTO Products (?, ?, "Vedbo", "Chair", 299.00, "Oak", ?, "An even more fancy chair.", "26 x 30 x 31 inches", 5)
INSERT INTO Products (?, ?, "Ectorp", "Chair", 249.00, "Oak", ?, "Oohhh!!! Pretty!", "27 x 32 x 31.5 inches", 5)
INSERT INTO Products (?, ?, "Ectorp", "Chair", 289.00, "Oak", ?, "I love it!", "27.5 x 31 x 31.5 inches", 5)

INSERT INTO Products (?, ?, "Hemnes", "Coffee Table", 149.00, "Oak", ?, "Cool coffee table", "42 x 24 x 18 inches", 5)
INSERT INTO Products (?, ?, "Hemnes", "Coffee Table", 139.00, "Oak", ?, "Decent coffee table.", "40 x 22.5 x 18 inches", 5)
INSERT INTO Products (?, ?, "Trulstorp", "Coffee Table", 99.99, "Oak", ?, "Lame coffee table.", "22.5 x 22.5 x 17.5 inches", 5)
INSERT INTO Products (?, ?, "Trulstorp", "Coffee Table", 79.00, "Oak", ?, "You don't want this coffee table.", "20 x 22.5 x 17.5 inches", 5)
INSERT INTO Products (?, ?, "Vejmon", "Coffee Table", 89.00, "Oak", ?, "You might want this coffee table.", "36 x 22.5 x 17.5 inches", 5)

INSERT INTO Products (?, ?, "Vejmon", "Sofa", 699.99, "Oak", ?, "Comfy.So serious.", "64.2 x 35.8 x 33.1 inches", 5)
INSERT INTO Products (?, ?, "Trulstorp", "Sofa", 650.00, "Oak", ?, "Great for your dog.", "63.5 x 35 x 32 inches", 5)
INSERT INTO Products (?, ?, "Hemnes", "Sofa", 725.00, "Oak", ?, "Sleepy time.", "64.5 x 33 x 32.5 inches", 5)
INSERT INTO Products (?, ?, "Ectorp", "Sofa", 645.00, "Oak", ?, "Very restful time.", "63.5 x 32.7 x 32.8 inches", 5)
INSERT INTO Products (?, ?, "Hasselvika", "Sofa", 599.00, "Oak", ?, "Cheap... kinda.", "62.5 x 32.3 x 32.3 inches", 5)

INSERT INTO Products (?, ?, "Hasselvika", "Desk", 89.00, "Oak", ?, "Do some work son!", "28.25 x 51.3125 x 53.625 inches", 5)
INSERT INTO Products (?, ?, "Hasselvika", "Desk", 105.00, "Oak", ?, "Study time.", "20 x 42 x 36.8 inches", 5)
INSERT INTO Products (?, ?, "Trulstorp", "Desk", 99.99, "Oak", ?, "More things on the desk!", "59.5 x 59.5 x 30.8 inches", 5)
INSERT INTO Products (?, ?, "Ectorp", "Desk", 79.99, "Oak", ?, "Fun activities!", "29.5 x 64.5 x 30.5 inches", 5)
INSERT INTO Products (?, ?, "Hemnes", "Desk", 69.99, "Oak", ?, "Just the right size", "29.5 x 62.5 x 31.5 inches", 5)

-- -----------------------------------------------------
-- Table `mydb`.`Orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Orders` (
  `OrderID` INT NOT NULL,
  `UserID` VARCHAR(45) NOT NULL,
  `TotalPrice` DECIMAL(2) NOT NULL,
  `Discounts` DECIMAL(2) NOT NULL,
  `Timestamp` TIME NOT NULL,
  `Status` VARCHAR(45) NOT NULL,
  `TotalQuantity` INT NOT NULL,
  `UserOrderProduct_UserID` INT NOT NULL,
  `UserOrderProduct_OrderID` INT NOT NULL,
  `UserOrderProduct_ProductID` INT NOT NULL,
  PRIMARY KEY (`OrderID`),
  INDEX `fk_Orders_UserOrderProduct1_idx` (`UserOrderProduct_UserID` ASC, `UserOrderProduct_OrderID` ASC, `UserOrderProduct_ProductID` ASC) VISIBLE,
  CONSTRAINT `fk_Orders_UserOrderProduct1`
    FOREIGN KEY (`UserOrderProduct_UserID` , `UserOrderProduct_OrderID` , `UserOrderProduct_ProductID`)
    REFERENCES `mydb`.`UserOrderProduct` (`UserID` , `OrderID` , `ProductID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
