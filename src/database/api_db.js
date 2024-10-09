// ------------------------------
//  Karot_2.0 - api_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions to change
//  This file contains the functions to change
//  the data in the database.
// ------------------------------

const mysql = require("mysql2");

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

async function getImagesRecipes(link) {
  // Fetch the image from the API and return it as a buffer
  return await fetch(link).then(async (response) =>
    Buffer.from(await response.arrayBuffer())
  );
}

//Function to add an allergy
async function addAllergy(userId, ingredientId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });

  return new Promise((resolve, reject) => {
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
}

// Function delete an allergy
async function deleteAllergy(userId, ingredientId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });

  return new Promise((resolve, reject) => {
    const deleteAllergyQuery = `DELETE FROM To_Be_Allergic WHERE ID_User = ? AND ID_Ingredient = ?`;
    db.query(deleteAllergyQuery, [userId, ingredientId], (err, result) => {
      db.end();
      if (err) return reject("Error when deleting the allergy : " + err);
      if (result.affectedRows === 0) return reject("Allergy not found");
      return resolve("Allergy successfully deleted");
    });
  });
}

// Function to get random recipe
async function getRandomRecipes(limit) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Recipe ORDER BY RAND() LIMIT ?`,
      [limit],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function addRecipe(name, ingredients, steps, image, ID_Creator) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });

  return new Promise((resolve, reject) => {
    // Insert the recipe into the Recipe table
    const insertRecipeQuery = `INSERT INTO Recipe (Name_Recipe, Steps, Image, ID_Creator) VALUES (?, ?, ?, ?)`;
    db.query(
      insertRecipeQuery,
      [name, steps, image, ID_Creator],
      (err, result) => {
        if (err) return reject("Error adding recipe: " + err);

        // Get the inserted recipe ID
        const recipeId = result.insertId;

        // Now insert ingredients into the To_Require table
        const ingredientPromises = ingredients.map((ingredient) => {
          return new Promise((resolve, reject) => {
            // Assume you have a method to get the ingredient ID
            const checkIngredientQuery = `SELECT ID_Ingredient FROM Ingredient WHERE Name_Ingredient = ?`;
            db.query(checkIngredientQuery, [ingredient.trim()], (err, rows) => {
              if (err) return reject(err);
              if (rows.length > 0) {
                const ingredientId = rows[0].ID_Ingredient;
                const insertToRequireQuery = `INSERT INTO To_Require (ID_Ingredient, ID_Recipe, Quantity) VALUES (?, ?, ?)`;
                db.query(
                  insertToRequireQuery,
                  [ingredientId, recipeId, "1"],
                  (err) => {
                    if (err) return reject(err);
                    resolve();
                  }
                );
              } else {
                // Handle case where ingredient does not exist (optional)
                resolve(); // Or reject with an error
              }
            });
          });
        });

        Promise.all(ingredientPromises)
          .then(() => resolve("Recipe successfully added"))
          .catch(reject);
      }
    );
  });
}

// Export the functions
module.exports = {
  getMostLiked,
  addAllergy,
  deleteAllergy,
  getRandomRecipes,
  addRecipe,
  getImagesRecipes,
};
