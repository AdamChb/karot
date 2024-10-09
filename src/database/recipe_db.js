// ------------------------------
//  Karot_2.0 - api_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions linked with the table Recipe in the database.
// ------------------------------

const mysql = require("mysql2");

async function getRecipe(id) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM Recipe WHERE ID_Recipe = ?",
      [id],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function insertRecipe(recipe) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO Recipe (Name_Recipe, Steps, Image, ID_Creator) VALUES (?, ?, BINARY(?), ?)",
      [recipe.name, recipe.steps, recipe.image, recipe.userId],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

module.exports = { getRecipe, insertRecipe };
