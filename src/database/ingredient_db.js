// ------------------------------
//  Karot_2.0 - api_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions linked with the table Ingredient in the database.
// ------------------------------

const mysql = require("mysql2");

async function getIngredient(id) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM Ingredient WHERE ID_Ingredient = ?",
      [id],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function searchIngredient(name) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM Ingredient WHERE Name_Ingredient = ?",
      [name],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function insertIngredient(ingredient) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO Ingredient (Name_Ingredient) VALUES (?)",
      [ingredient.name],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results.insertId);
      }
    );
  });
}

module.exports = { getIngredient, searchIngredient };
