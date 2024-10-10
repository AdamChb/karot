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

function getRecipe(id) {
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
        // Check if a recipe was found
        if (results.length > 0) {
          let recipe = results[0]; // Get the first recipe

          // Check if the image exists and is a buffer
          if (recipe.Image) {
            // Convert the binary image data to a base64 string
            recipe.Image = recipe.Image.toString('base64');
          }
          console.log(recipe);
        }
        db.end();
        if (err) return reject(err);
        return resolve(recipe);
      }
    );
  });
}

function getRecipes(id_start, nb_recipes, search = "") {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  const query =
    search === ""
      ? "SELECT * FROM Recipe LIMIT ?, ?"
      : "SELECT * FROM Recipe WHERE Name_Recipe LIKE %?% LIMIT ?, ?";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      search === ""
        ? [parseInt(id_start), parseInt(nb_recipes)]
        : [search, parseInt(id_start), parseInt(nb_recipes)],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

function insertRecipe(recipe) {
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

function searchRecipe(name = "") {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  const query =
    name === ""
      ? "SELECT * FROM Recipe"
      : "SELECT * FROM Recipe WHERE Name_Recipe LIKE %?%";
  return new Promise((resolve, reject) => {
    db.query(query, name === "" ? [] : [name], (err, results) => {
      db.end();
      if (err) return reject(err);
      return resolve(results);
    });
  });
}
module.exports = { getRecipe, getRecipes, insertRecipe, searchRecipe };
