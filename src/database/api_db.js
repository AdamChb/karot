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

const { use } = require("bcrypt/promises");
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
      `SELECT * FROM Recipe ORDER BY Likes DESC LIMIT ?`, [limit],
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

// Function to get planned meals for a specific user
async function getPlannedMeals(userId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT 
          r.ID_Recipe, 
          r.Name_Recipe, 
          r.Category,
          r.Image,
          r.ID_Creator,
          ku.Username AS Author_Name,
          (SELECT COUNT(*) FROM To_Like tl2 WHERE tl2.ID_Recipe = r.ID_Recipe) AS Likes_Count,
          (CASE WHEN tl.ID_User IS NOT NULL THEN TRUE ELSE FALSE END) AS Has_Liked
      FROM 
          To_Save ts
      JOIN 
          Recipe r ON ts.ID_Recipe = r.ID_Recipe
      JOIN 
          Karot_User ku ON r.ID_Creator = ku.ID_User
      LEFT JOIN 
          To_Like tl ON r.ID_Recipe = tl.ID_Recipe AND ts.ID_User = ?
      WHERE 
          ts.ID_User = ?`,[userId, userId, userId], (err, meals) => { // Query the database for planned meals
      db.end(); // Close the connection
      if (err){
        console.error("Error fetching planned meals:", err);
        reject(err); // Propagate the error for handling in the route
      }
      return resolve(meals); // Return the retrieved meals
    });
  });
}

// Function to add a meal for a specific user
async function addMeal(userId, recipeId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  try {
    const existingMeal = await db.query("SELECT * FROM To_Save WHERE ID_User = ? AND ID_Recipe = ?", [userId, recipeId]);
    
    // Prevent adding the same meal twice
    if (existingMeal.length > 0) {
      throw new Error("Meal already exists for this user.");
    }

    const result = await db.query("INSERT INTO meals (ID_User, ID_Recipe) VALUES (?, ?)", [userId, recipeId]);
    return result; // Return the result of the insertion
  } catch (error) {
    console.error("Error adding meal:", error);
    throw error; // Propagate the error for handling in the route
  }
}

// Function to delete a meal for a specific user
async function checkMeal(userId, recipeId) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  try {
    const result = await db.query("DELETE FROM To_Save WHERE ID_User = ? AND recipeId = ?", [userId, recipeId]);
    
    if (result.affectedRows === 0) {
      throw new Error("No meal found to delete."); // Handle case where no meal was found
    }

    return result; // Return the result of the deletion
  } catch (error) {
    console.error("Error deleting meal:", error);
    throw error; // Propagate the error for handling in the route
  }
}
// Export the functions
module.exports = {
  getMostLiked,
  addAllergy,
  deleteAllergy,
  getRandomRecipes,
  addRecipe,

  getImagesRecipes,
  checkMeal,
  getPlannedMeals, 
  addMeal
};
>>>>>>>>> Temporary merge branch 2
