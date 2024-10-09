// ------------------------------
//  Karot_2.0 - api_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions linked with the table To_Require in the database.
// ------------------------------

const mysql = require("mysql2");

async function getRequiredIngredients(id) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM To_Require WHERE ID_Recipe = ?",
      [id],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function insertRequiredIngredient(ingredient) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO To_Require (ID_Recipe, ID_Ingredient, Quantity) VALUES (?, ?, ?)",
      [ingredient.recipeId, ingredient.ingredientId, ingredient.quantity],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function getGenerateMeals(ingredients) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT r.ID_Recipe FROM Recipe r WHERE NOT EXISTS ( SELECT 1 FROM To_Require tr WHERE tr.ID_Recipe = r.ID_Recipe AND tr.ID_Ingredient NOT IN (?)",
      [ingredients],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

module.exports = {
  getRequiredIngredients,
  insertRequiredIngredient,
  getGenerateMeals,
};
