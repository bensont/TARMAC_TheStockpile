-- Further edits done to remove extra, unwanted code.
-- -----------------------------------------------------
-- Schema theStockpile
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema theStockpile
-- -----------------------------------------------------
CREATE DATABASE thestockpile;

-- -----------------------------------------------------
-- Table 'theStockpile'.'Users'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Users (
  userID SERIAL,
  firstname VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PermissionsLevel VARCHAR(45) NOT NULL,
  StreetAddress VARCHAR(45) NOT NULL,
  City VARCHAR(45) NOT NULL,
  State VARCHAR(45) NOT NULL,
  ZipCode INT NOT NULL,
  DeliveryInstructions VARCHAR(45) NOT NULL,
  email VARCHAR(255) NOT NULL,
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (userID)
);


-- -----------------------------------------------------
-- Table 'theStockpile'.'Products'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Products (
  ProductID SERIAL,
  Name VARCHAR(45) NOT NULL,
  Brand VARCHAR(45) NOT NULL,
  Type VARCHAR(45) NOT NULL,
  Cost DECIMAL(6,2) NOT NULL,
  Material VARCHAR(45) NOT NULL,
  Image VARCHAR(45) NOT NULL,
  Image2 VARCHAR(45) NOT NULL,
  Image3 VARCHAR(45) NOT NULL,
  Description VARCHAR(200) NOT NULL,
  Dimensions VARCHAR(45) NOT NULL,
  Stock INT NOT NULL,
  UserOrderProduct_UserID INT,
  PRIMARY KEY (ProductID)
);


-- -----------------------------------------------------
-- Table 'theStockpile'.'Orders'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Orders (
  OrderID SERIAL,
  UserID VARCHAR(45) NOT NULL,
  TotalCost DECIMAL(6,2) NOT NULL,
  Discounts DECIMAL(6,2) NOT NULL,
  Timestamp TIME NOT NULL,
  Status VARCHAR(45) NOT NULL,
  TotalQuantity INT NOT NULL,
  UserOrderProduct_UserID INT NOT NULL,
  PRIMARY KEY (OrderID)
);


-- -----------------------------------------------------
-- Table 'theStockpile'.'OrderProduct'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS OrderProduct (
  Products_ProductID INT NOT NULL,
  Orders_OrderID INT NOT NULL,
  Quantity INT NOT NULL,
  Cost DECIMAL(6,2),
  DiscountCost DECIMAL(6,2) NOT NULL,
  Users_userID VARCHAR(45) NOT NULL,
  PRIMARY KEY (Products_ProductID, Orders_OrderID)
);

INSERT INTO Users (firstname, lastname, password, PermissionsLevel, StreetAddress, City, State, ZipCode, DeliveryInstructions, email)
VALUES ('admin','admin','password','admin','54 Red Street','New York City','New York', 10027, 'Drop on porch', 'spiderman@marvelheroes.org'),
('Bruce', 'Banner','hulk','customer','123 Green Street','Dayton','Ohio', 45377,'Drop on porch', 'hulk@marvelheroes.org'),
('Anthony', 'Stark','ironman','customer','456 Red Lane','Long Island','New York', 11101,'Signature required', 'ironman@marvelheroes.org'),
('Steve', 'Rogers','captainamerica','customer','159 Blue Drive','New York City','New York', 10087,'Call before delivery', 'captainamerica@marvelheroes.org'),
('Stephen', 'Strange','dorctorstrange','customer','753 Purple Street','Philadelphia','Pennsylvania', 19135,'Signature required', 'doctorstrange@marvelheroes.org'),
('Peter' , 'Parker','spiderman','customer','54 Red Street','New York City','New York', 10027,'Drop on porch', 'spiderman@marvelheroes.org'),
('Scott', 'Lang','antman','customer','4876 Anthony Drive','Coral Gables','Florida', 33134,'Call before delivery', 'antman@marvelheroes.org'),
('Peter', 'Quill','starlord','customer','6698 Space Lane','St. Charles','Missouri', 63302,'Call before delivery, I may be way, way out.', 'starlord@marvelheroes.org'),
('Wade', 'Wilson','deadpool','customer','9855 Undead Stree','New York City','New York', 10115,'Signature required', 'deadpool@marvelheroes.org'),
('Logan', 'Wilson','wolverine','customer','1407 Graymalkin Lane','Salem Center','New York', 10560,'Drop on porch', 'wolverine@marvelheroes.org');


INSERT INTO Products (Name, Brand, Type, Cost, Material, Image, Image2, Image3, Description, Dimensions, Stock)
VALUES ('Classic','Good Wood', 'Chair', 169.00, 'Oak', 'chair2a.jpg', 'chair2b.jpg', 'chair2c.jpg', 'A beautifully crafted chair.', '25 x 29.5 x 31 inches', 5),
('Classy Classic','Custom Crafts', 'Chair', 199.99, 'Oak,Metal', 'chair3a.jpg''', 'chair3b.jpg', 'chair3c.jpg', 'A chair superior to any bar stool.', '25.5 x 30 x 30.5 inches', 5),
('Royal Bar','Encono-ture', 'Chair', 69.00, 'Pine', 'chair1a.jpg', 'chair1b.jpg', 'chair1c.jpg', 'A basic, but functional chiar', '26 x 30 x 31 inches', 5),
('Cushoned Presidential','Good Wood', 'Chair', 249.00, 'Oak,Metal', 'chair4a.jpg', 'chair4b.jpg', 'chair4c.jpg', 'A chair that puts comfort in your behind.', '27 x 32 x 31.5 inches', 5),
('Porch Rocker','Custom Crafts', 'Chair', 289.00, 'Oak', 'chair5a.jpg', 'chair5b.jpg', 'chair5c.jpg', 'A classic rocking chair. Quality.', '27.5 x 31 x 31.5 inches', 5),

('Mirrored Princess','Good Wood', 'Dresser', 369.00, 'Oak', 'dresser1a.jpg', 'dresser1b.jpg', 'dresser1c.jpg', 'A beautifully crafted dresser. Mirror included.', '25 x 29.5 x 31 inches', 5),
('Vintage','Custom Crafts', 'Dresser', 299.99, 'Maple', 'dresser2a.jpg', 'dresser2b.jpg', 'dresser2c.jpg', 'Classic, beautifully designed with uniquely patterned wood.', '25.5 x 30 x 30.5 inches', 5),
('London Classic','Encono-ture', 'Dresser', 469.00, 'Oak', 'dresser3a.jpg', 'dresser3b.jpg', 'dresser3c.jpg', 'A large dresser with lots of space.', '26 x 30 x 31 inches', 5),
('London Bedside','Good Wood', 'Dresser', 249.00, 'Oak,Metal', 'dresser4a.jpg', 'dresser4b.jpg', 'dresser4c.jpg', 'A smaller dresser. Very useful as a nightstand.', '27 x 32 x 31.5 inches', 5),

('Tri-Bright','White Glow', 'Lighting', 229.00, 'Glass,Metal', 'light1a.jpg', 'light1b.jpg', 'light1c.jpg', 'Triple the beauty!', '25 x 29.5 x 31 inches', 5),
('Brooklyn','Custom Crafts', 'Lighting', 199.99, 'Glass,Metal', 'light2a.jpg', 'light2b.jpg', 'light2c.jpg', 'Six overhead lights.', '25.5 x 30 x 30.5 inches', 5),
('Rustic Bar','Encono-ture', 'Lighting', 179.00, 'Glass,Metal', 'light3a.jpg', 'light3b.jpg', 'light3c.jpg', 'An overhead light with a rustic look.', '26 x 30 x 31 inches', 5),
('Paris','Good Wood', 'Lighting', 119.00, 'Glass,Metal', 'light4a.jpg', 'light4b.jpg', 'light4c.jpg', 'A simple overhead light.', '27 x 32 x 31.5 inches', 5),
('Royal','Custom Crafts', 'Lighting', 239.99, 'Glass,Metal', 'light5a.jpg', 'light5b.jpg', 'light5c.jpg', 'Upward facing, six hanging overhead.', '25.5 x 30 x 30.5 inches', 5),

('Vintage Snow White','Good Wood', 'Mirror', 329.00, 'Spruce', 'mirror1a.jpg', 'mirror1b.jpg', 'mirror1c.jpg', 'This full length mirror is hand crafted and adjusts to the angle you need.', '25 x 29.5 x 31 inches', 5),
('Jersey','Custom Crafts', 'Mirror', 79.99, 'Pine', 'mirror2a.jpg', 'mirror2b.jpg', 'mirror2c.jpg', 'A simple bathroom mirror.', '25.5 x 30 x 30.5 inches', 5),
('Vanity','Encono-ture', 'Mirror', 39.00, 'Metal', 'mirror3a.jpg', 'mirror3b.jpg', 'mirror3c.jpg', 'This mirror has two lighted sides, true reflection and magnified, to fit all your needs.', '26 x 30 x 31 inches', 5),

('Couch Buddy','Encono-ture', 'Table', 59.00, 'Pine,Metal', 'table1a.jpg', 'table1b.jpg', 'table1c.jpg', 'A simple end table.', '25 x 29.5 x 31 inches', 5),
('Cutting Rollaway','Custom Crafts', 'Table', 299.99, 'Pine,Metal', 'table2a.jpg', 'table2b.jpg', 'table2c.jpg', 'Rollable with locking wheels and center trash cutaway.', '25.5 x 30 x 30.5 inches', 5),
('Mini Ottoman','Encono-ture', 'Table', 49.00, 'Pine,Leather', 'table3a.jpg', 'table3b.jpg', 'table3c.jpg', 'A small end table that can be used for storage or as a chair.', '26 x 30 x 31 inches', 5),
('Secret Woods','Good Wood', 'Table', 219.00, 'Pine', 'table4a.jpg', 'table4b.jpg', 'table4c.jpg', 'A table useful for storage. It can be extened for more usable surface area.', '27 x 32 x 31.5 inches', 5),
('The Dumont','Custom Crafts', 'Table', 59.99, 'Oak', 'table5a.jpg', 'table5b.jpg', 'table5c.jpg', 'A classic display table. Perfect for displaying family photos or orchids.', '25.5 x 30 x 30.5 inches', 5),
('Classic Round','Custom Crafts', 'Table', 239.99, 'Oak', 'table6a.jpg', 'table6b.jpg', 'table6c.jpg', 'Hand crafted with 3 removable leafs to suit the needs of your family.', '25.5 x 30 x 30.5 inches', 5);
