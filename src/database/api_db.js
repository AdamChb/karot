// ------------------------------
//  Karot_2.0 - api_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions to change
//  the data in the database.
// ------------------------------

const mysql = require("mysql2");
const serv = { 
  host: "concordia-db.docsystem.xyz",
  user: "uml-b-3",
  password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
  database: "uml-b-3",
};

//Function to get the most-liked recipes
async function getMostLiked(limit) {
  // TEMP: Demander à Sacha si on recopie à chaque fois les identifiants
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Recipe ORDER BY Likes DESC LIMIT ${limit}`,
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

//Function to add an allergy
async function addAllergy(userId, ingredient) {
  const db = mysql.createConnection(serv);

  return new Promise((resolve, reject) => {
    // Request to get the ongredient's ID
    const queryIngredient = `SELECT ID_Ingredient FROM Ingredient WHERE Name_Ingredient = ?`;
    db.query(queryIngredient, [ingredient], (err, result) => {
      if (err) return reject("Error when retrieving ingredient : " + err);
      if (result.length === 0) return reject("Ingredient not found");

      const ingredientId = result[0].ID_Ingredient;

      // Verification to see if user already has this allergy
      const checkQuery = `SELECT * FROM To_Be_Allergic WHERE ID_User = ? AND ID_Ingredient = ?`;
      db.query(checkQuery, [userId, ingredientId], (err, allergyCheck) => {
        if (err) return reject("Error when checking for allergy : " + err);
        if (allergyCheck.length > 0) return reject("Allergy already present");

        // If allergy doesn't exists, we add it
        const addAllergyQuery = `INSERT INTO To_Be_Allergic (ID_User, ID_Ingredient) VALUES (?, ?)`;
        db.query(addAllergyQuery, [userId, ingredientId], (err, result) => {
          db.end();
          if (err) return reject("Error when adding the allergy : " + err);
          return resolve("Allergy successfully added");
        });
      });
    });
  });
}

async function getImagesRecipes(link) {
  // Fetch the image from the API and return it as a buffer
  return await fetch(link).then(async (response) =>
    Buffer.from(await response.arrayBuffer())
  );
}

// Get a recipe by id
async function getRecipe(id_user, id_recipe) {
  const db = mysql.createConnection(serv);
  return new Promise((resolve, reject) => {
    db.query(
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
          r.ID_Recipe = ?
      GROUP BY r.ID_Recipe, r.Name_Recipe, r.Steps, r.Category, r.Image, ku.Username, tl.ID_User;`,
      [id_user, id_recipe],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

// Export the function getMostLiked
module.exports = { getMostLiked, addAllergy, getImagesRecipes, getRecipe };
