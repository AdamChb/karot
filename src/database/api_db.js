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

//Function to get the most-liked recipes
async function getMostLiked(limit) {
  // TEMP: Demander à Sacha si on recopie à chaque fois les identifiants
  const db = mysql.createConnection({
    host: "localhost",
    user: "karot_root",
    password: "efreikarot240",
    database: "karot",
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
  const db = mysql.createConnection({
    host: "localhost",
    user: "karot_root",
    password: "efreikarot240",
    database: "karot",
  });

  return new Promise((resolve, reject) => {
    // Request to get the ingredient's ID
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

//Function to check a meal (delete it from the user's saved meals)
async function checkMeal(userId, recipeId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });

  return new Promise((resolve, reject) => {
    // Delete the meal from the user's saved meals
    db.query(
      `DELETE FROM To_Save WHERE ID_User = ${userID} AND ID_Recipe = ${recipeID}`,
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

//Function to get the user's planned meals
async function getPlannedMeals(userId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });

  return new Promise((resolve, reject) => {
    // Get meals informations from the user's planned meals 
    db.query(
      `SELECT
      r.ID_Recipe,
      r.Name_Recipe,
      r.Steps,
      r.Likes,
      r.Image,
      r.Category
      FROM To_Save ts
      JOIN Recipe r
      ON r.ID_Recipe = ts.ID_Recipe 
      WHERE ts.ID_User = ${userID}`,
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

//Function to get the user's planned meals
async function getPlannedMeals(userId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });

  return new Promise((resolve, reject) => {
    // Get meals informations from the user's planned meals 
    db.query(
      `SELECT
      r.ID_Recipe,
      r.Name_Recipe,
      r.Steps,
      r.Likes,
      r.Image,
      r.Category
      FROM To_Save ts
      JOIN Recipe r
      ON r.ID_Recipe = ts.ID_Recipe 
      WHERE ts.ID_User = ${userID}`,
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

//Function to add a meal to the user's planned meals
async function addMeal(userId, recipeId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });

  return new Promise((resolve, reject) => {
    // Insert the recipe ID and the user ID to the planned meals table
    db.query(
      `INSERT INTO To_Save (ID_User, ID_Recipe) 
      VALUES (${userId}, ${recipeId})`,
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

// Export the functions
module.exports = { getMostLiked, addAllergy, getImagesRecipes, checkMeal, getPlannedMeals, addMeal};
