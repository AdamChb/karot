-- ------------------------------
--  Karot_2.0 - new_database.sql
--
--  Mathias BENOIT
--  Adam CHABA
--  Eva MAROT
--  Sacha PORTAL
--
--  This file contains the SQL requests 
--  to create the database of the Karot project.
-- ------------------------------

CREATE DATABASE karot;

USE karot;

CREATE TABLE Karot_User(
   ID_User INT AUTO_INCREMENT,
   Username VARCHAR(50) NOT NULL,
   Email VARCHAR(50) NOT NULL,
   Password VARCHAR(50) NOT NULL,
   PRIMARY KEY(ID_User),
   UNIQUE(Email),
   UNIQUE(Username)
);

CREATE TABLE Ingredient(
   ID_Ingredient INT AUTO_INCREMENT,
   Name_Ingredient VARCHAR(50),
   PRIMARY KEY(ID_Ingredient),
   UNIQUE(Name_Ingredient)
);

CREATE TABLE Recipe(
   ID_Recipe INT AUTO_INCREMENT,
   Name_Recipe VARCHAR(100),
   Steps VARCHAR(8000) NOT NULL,
   Likes INT DEFAULT 0,
   Category VARCHAR(50),
   Image VARCHAR(50),
   ID_Creator INT NOT NULL,
   PRIMARY KEY(ID_Recipe),
   FOREIGN KEY(ID_Creator) REFERENCES Karot_User(ID_User)
);


CREATE TABLE To_Require(
   ID_Ingredient INT,
   ID_Recipe INT,
   Quantity VARCHAR(50) NOT NULL,
   PRIMARY KEY(ID_Ingredient, ID_Recipe),
   FOREIGN KEY(ID_Ingredient) REFERENCES Ingredient(ID_Ingredient),
   FOREIGN KEY(ID_Recipe) REFERENCES Recipe(ID_Recipe)
);

CREATE TABLE To_Like(
   ID_User INT,
   ID_Recipe INT,
   PRIMARY KEY(ID_User, ID_Recipe),
   FOREIGN KEY(ID_User) REFERENCES Karot_User(ID_User),
   FOREIGN KEY(ID_Recipe) REFERENCES Recipe(ID_Recipe)
);

CREATE TABLE To_Save(
   ID_User INT,
   ID_Recipe INT,
   Meal_Date DATETIME NOT NULL,
   PRIMARY KEY(ID_User, ID_Recipe),
   FOREIGN KEY(ID_User) REFERENCES Karot_User(ID_User),
   FOREIGN KEY(ID_Recipe) REFERENCES Recipe(ID_Recipe)
);

CREATE TABLE To_Be_Allergic(
   ID_User INT,
   ID_Ingredient INT,
   PRIMARY KEY(ID_User, ID_Ingredient),
   FOREIGN KEY(ID_User) REFERENCES Karot_User(ID_User),
   FOREIGN KEY(ID_Ingredient) REFERENCES Ingredient(ID_Ingredient)
);

INSERT INTO karot_user (Username, Pseudo, Email, Password) VALUES ("admin", "admin", "admin", "XnO97.5!7ER3$ab");