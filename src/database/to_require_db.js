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

async function getGenerateMeals(userId, ingredients) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    const query =
      `SELECT 
          r.ID_Recipe,
          r.Name_Recipe,
          r.Steps,
          r.Category,
          r.Image,
          ku.Username AS Author_Name,
          (SELECT COUNT(*) FROM To_Like tl2 WHERE tl2.ID_Recipe = r.ID_Recipe) AS Likes_Count,
          (CASE WHEN tl.ID_User IS NOT NULL THEN TRUE ELSE FALSE END) AS Has_Liked,
          GROUP_CONCAT(CONCAT(i.Name_Ingredient, ' (', tr.Quantity, ')') SEPARATOR ', ') AS Ingredients_With_Quantity
      FROM 
          Recipe r
      JOIN 
          Karot_User ku ON r.ID_Creator = ku.ID_User
      LEFT JOIN 
          To_Like tl ON r.ID_Recipe = tl.ID_Recipe AND tl.ID_User = ?
      LEFT JOIN 
          To_Require tr ON r.ID_Recipe = tr.ID_Recipe
      LEFT JOIN 
          Ingredient i ON tr.ID_Ingredient = i.ID_Ingredient
      WHERE 
          r.ID_Recipe IN (
            SELECT tr.ID_Recipe
            FROM To_Require tr
            WHERE tr.ID_Ingredient IN (` +
      ingredients +
      `
            ) 
            GROUP BY tr.ID_Recipe
            HAVING COUNT(DISTINCT tr.ID_Ingredient) = (
              SELECT COUNT(DISTINCT tr2.ID_Ingredient)
              FROM To_Require tr2
              WHERE tr2.ID_Recipe = tr.ID_Recipe
            )
          )
      GROUP BY r.ID_Recipe, r.Name_Recipe, r.Steps, r.Category, r.Image, ku.Username, tl.ID_User`;
    db.query(query, [userId], (err, results) => {
      db.end();
      results.forEach((recipe) => {
        // Ensure that recipe.Image is a Buffer before converting
        if (recipe.Image && Buffer.isBuffer(recipe.Image)) {
          recipe.Image = recipe.Image.toString("base64"); // Convert to Base64 string
        } else {
          recipe.Image = null; // Handle case with no image or incorrect type
        }
      });
      if (err) return reject(err);
      return resolve(results);
    });
  });
}

module.exports = {
  getRequiredIngredients,
  insertRequiredIngredient,
  getRequiredRecipe,
  getGenerateMeals,
};
