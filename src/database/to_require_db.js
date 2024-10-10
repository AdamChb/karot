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

async function getRequiredIngredients(recipeId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM To_Require WHERE ID_Recipe = ?",
      [recipeId],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function insertRequiredIngredient(recipeId, ingredientId, quantity) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO To_Require (ID_Recipe, ID_Ingredient, Quantity) VALUES (?, ?, ?)",
      [recipeId, ingredientId, quantity],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function getRequiredRecipe(ingredientId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT Recipe.* FROM To_Require JOIN Recipe ON To_Require.ID_Recipe = Recipe.ID_Recipe WHERE ID_Ingredient = ?",
      [ingredientId],
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
  db.query(
    "SELECT r.ID_Recipe FROM Recipe r WHERE NOT EXISTS ( SELECT 1 FROM To_Require tr WHERE tr.ID_Recipe = r.ID_Recipe AND tr.ID_Ingredient NOT IN (?)",
    [ingredients],
    (err, results) => {
      db.end();
      if (err) return reject(err);
      return resolve(results);
    }
  );
}

module.exports = {
  getRequiredIngredients,
  insertRequiredIngredient,
  getRequiredRecipe,
  getGenerateMeals,
};
