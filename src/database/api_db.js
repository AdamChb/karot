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

// Create a connection pool with promises
const pool = mysql.createPool({
  host: "concordia-db.docsystem.xyz",
  user: "uml-b-3",
  password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
  database: "uml-b-3",
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
}).promise();

// Function to get the most-liked recipes
async function getMostLiked(limit, userId) {
  try {
    const [results] = await pool.query(
      `SELECT 
          r.ID_Recipe,
          r.Name_Recipe,
          r.Steps,
          r.Category,
          r.Image,
          ku.Username AS Author_Name,
          (SELECT COUNT(*) FROM To_Like tl2 WHERE tl2.ID_Recipe = r.ID_Recipe) AS Likes_Count,
          (CASE WHEN tl.ID_User IS NOT NULL THEN TRUE ELSE FALSE END) AS Has_Liked
      FROM 
          Recipe r
      JOIN 
          Karot_User ku ON r.ID_Creator = ku.ID_User
      LEFT JOIN 
          To_Like tl ON r.ID_Recipe = tl.ID_Recipe AND tl.ID_User = ?
      ORDER BY Likes_Count DESC LIMIT ?`,
      [userId, limit]
    );
   // Check if results contain any recipes
   if (results.length > 0) {
    // Loop through each recipe
    results.forEach(recipe => {
      // Ensure that recipe.Image is a Buffer before converting
      if (recipe.Image && Buffer.isBuffer(recipe.Image)) {
        recipe.Image = recipe.Image.toString('base64'); // Convert to Base64 string
      } else {
        recipe.Image = null; // Handle case with no image or incorrect type
      }
    });
  }
    return results;
  } catch (err) {
    throw new Error(`Error fetching most liked recipes: ${err.message}`);
  }
}

// Function to add an allergy
async function addAllergy(userId, ingredientId) {
  try {
    const [allergyCheck] = await pool.query(
      `SELECT * FROM To_Be_Allergic WHERE ID_User = ? AND ID_Ingredient = ?`,
      [userId, ingredientId]
    );

    if (allergyCheck.length > 0) {
      return "This allergy is already added";
    }

    await pool.query(
      `INSERT INTO To_Be_Allergic (ID_User, ID_Ingredient) VALUES (?, ?)`,
      [userId, ingredientId]
    );
    
    console.log(`Allergy added for user ${userId}, ingredient ${ingredientId}`);
    return "Allergy successfully added";
  } catch (err) {
    throw new Error(`Error when adding the allergy: ${err.message}`);
  }
}



// Function to delete an allergy
async function deleteAllergy(userId, ingredientId) {
  try {
    const [result] = await pool.query(
      `DELETE FROM To_Be_Allergic WHERE ID_User = ? AND ID_Ingredient = ?`,
      [userId, ingredientId]
    );
    if (result.affectedRows === 0) {
      throw new Error("Allergy not found");
    }
    console.log(`Allergy deleted for user ${userId}, ingredient ${ingredientId}`);
    return "Allergy successfully deleted";
  } catch (err) {
    throw new Error(`Error when deleting the allergy: ${err.message}`);
  }
}

// Function to get the user's allergies
async function getAllergies(userId) {
  try {
    const [allergies] = await pool.query(
      `SELECT i.ID_Ingredient, i.Name_Ingredient
       FROM To_Be_Allergic tba
       JOIN Ingredient i ON tba.ID_Ingredient = i.ID_Ingredient
       WHERE tba.ID_User = ?`,
      [userId]
    );

    // Check if results contain any allergies
    if (allergies.length > 0) {
      return allergies;
    } else {
      return []; // Return an empty array if no allergies found
    }
  } catch (err) {
    throw new Error(`Error fetching allergies: ${err.message}`);
  }
}

// Function to get random recipes
async function getRandomRecipes(limit, userId) {
  try {
    const [results] = await pool.query(
      `SELECT 
          r.ID_Recipe,
          r.Name_Recipe,
          r.Steps,
          r.Category,
          r.Image,
          ku.Username AS Author_Name,
          (SELECT COUNT(*) FROM To_Like tl2 WHERE tl2.ID_Recipe = r.ID_Recipe) AS Likes_Count,
          (CASE WHEN tl.ID_User IS NOT NULL THEN TRUE ELSE FALSE END) AS Has_Liked
      FROM 
          Recipe r
      JOIN 
          Karot_User ku ON r.ID_Creator = ku.ID_User
      LEFT JOIN 
          To_Like tl ON r.ID_Recipe = tl.ID_Recipe AND tl.ID_User = ?
      ORDER BY RAND() LIMIT ?`,
      [userId, limit]
    );
  // Check if results contain any recipes
  if (results.length > 0) {
    // Loop through each recipe
    results.forEach(recipe => {
      // Ensure that recipe.Image is a Buffer before converting
      if (recipe.Image && Buffer.isBuffer(recipe.Image)) {
        recipe.Image = recipe.Image.toString('base64'); // Convert to Base64 string
      } else {
        recipe.Image = null; // Handle case with no image or incorrect type
      }
    });
  }
    return results;
  } catch (err) {
    throw new Error(`Error fetching random recipes: ${err.message}`);
  }
}

// Function to add a recipe
async function addRecipe(name, ingredients, steps, ID_Creator) {
  try {
    // Insert the new recipe into the Recipe table
    const [result] = await pool.query(
      `INSERT INTO Recipe (Name_Recipe, Steps, ID_Creator) VALUES (?, ?, ?)`,
      [name, steps, ID_Creator]
    );
    
    const recipeId = result.insertId;
    console.log(`Added recipe with ID: ${recipeId}`);

    // Array to hold promises for ingredient checks
    const ingredientPromises = ingredients.map(async (ingredient) => {
      // Trim any extra spaces from the ingredient name
      const trimmedIngredient = ingredient.trim();

      // Check if the ingredient exists
      const [rows] = await pool.query(
        `SELECT ID_Ingredient FROM Ingredient WHERE Name_Ingredient = ?`,
        [trimmedIngredient]
      );

      // If the ingredient does not exist, throw an error
      if (rows.length === 0) {
        throw new Error(`Ingredient "${trimmedIngredient}" not found`);
      }

      // If it exists, get the ingredient ID
      const ingredientId = rows[0].ID_Ingredient;

      // Insert the ingredient-recipe relationship into To_Require
      await pool.query(
        `INSERT INTO To_Require (ID_Ingredient, ID_Recipe, Quantity) VALUES (?, ?, ?)`,
        [ingredientId, recipeId, " "]
      );
    });

    // Wait for all ingredient promises to resolve
    await Promise.all(ingredientPromises);
    
    return "Recipe successfully added";
  } catch (err) {
    throw new Error(`Error adding recipe: ${err.message}`);
  }
}


// Function to get images for recipes
async function getImagesRecipes(link) {
  try {
    const response = await fetch(link);
    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
  } catch (err) {
    throw new Error(`Error fetching recipe image: ${err.message}`);
  }
}

// Function to get a recipe by id
async function getRecipe(id_user, id_recipe) {
  try {
    const [results] = await pool.query(
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
      GROUP BY r.ID_Recipe, r.Name_Recipe, r.Steps, r.Category, r.Image, ku.Username, tl.ID_User`,
      [id_user, id_recipe]
    );
    // Check if results contain any recipes
    if (results.length > 0) {
      // Loop through each recipe
      results.forEach(recipe => {
        // Ensure that recipe.Image is a Buffer before converting
        if (recipe.Image && Buffer.isBuffer(recipe.Image)) {
          recipe.Image = recipe.Image.toString('base64'); // Convert to Base64 string
        } else {
          recipe.Image = null; // Handle case with no image or incorrect type
        }
      });
    }
    return results;
  } catch (err) {
    throw new Error(`Error fetching recipe: ${err.message}`);
  }
}

// Function to get planned meals for a specific user
async function getPlannedMeals(userId) {
  try {
    const [meals] = await pool.query(
      `SELECT DISTINCT
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
          ts.ID_User = ?`,
      [userId, userId]
    );
    // Check if results contain any recipes
    if (meals.length > 0) {
      // Loop through each recipe
      meals.forEach(recipe => {
        // Ensure that recipe.Image is a Buffer before converting
        if (recipe.Image && Buffer.isBuffer(recipe.Image)) {
          recipe.Image = recipe.Image.toString('base64'); // Convert to Base64 string
        } else {
          recipe.Image = null; // Handle case with no image or incorrect type
        }
      });
    }
    return meals;
  } catch (err) {
    throw new Error(`Error fetching planned meals: ${err.message}`);
  }
}

// Function to add a meal for a specific user
async function addMeal(userId, recipeId) {
  try {
    const [results] = await pool.query(
      `SELECT * FROM To_Save WHERE ID_User = ? AND ID_Recipe = ?`,
      [userId, recipeId]
    );
    if (results.length > 0) {
      return { success: false, message: "Meal is already saved." };
    }

    await pool.query(
      `INSERT INTO To_Save (ID_User, ID_Recipe) VALUES (?, ?)`,
      [userId, recipeId]
    );
    return { success: true, message: "Meal added successfully." };
  } catch (err) {
    throw new Error(`Error adding meal: ${err.message}`);
  }
}

// Function to delete a meal for a specific user
async function checkMeal(userId, recipeId) {
  try {
    const [result] = await pool.query(
      `DELETE FROM To_Save WHERE ID_User = ? AND ID_Recipe = ?`,
      [userId, recipeId]
    );
    if (result.affectedRows === 0) {
      return { success: false, message: "No meal found to delete." };
    }
    return { success: true, message: "Meal deleted successfully." };
  } catch (err) {
    throw new Error(`Error deleting meal: ${err.message}`);
  }
}

// Function to get the user's liked recipes
async function getLikedRecipes(userId) {
  try {
    const [meals] = await pool.query(
      `SELECT DISTINCT
          r.ID_Recipe, 
          r.Name_Recipe, 
          r.Category,
          r.Image,
          r.ID_Creator,
          ku.Username AS Author_Name,
          (SELECT COUNT(*) FROM To_Like tl2 WHERE tl2.ID_Recipe = r.ID_Recipe) AS Likes_Count,
          (CASE WHEN tl.ID_User IS NOT NULL THEN TRUE ELSE FALSE END) AS Has_Liked
      FROM 
          To_Like tl
      JOIN 
          Recipe r ON tl.ID_Recipe = r.ID_Recipe
      JOIN 
          Karot_User ku ON r.ID_Creator = ku.ID_User
      WHERE 
          tl.ID_User = ?`,
      [userId, userId]
    );
    // Check if results contain any recipes
    if (meals.length > 0) {
      // Loop through each recipe
      meals.forEach(recipe => {
        // Ensure that recipe.Image is a Buffer before converting
        if (recipe.Image && Buffer.isBuffer(recipe.Image)) {
          recipe.Image = recipe.Image.toString('base64'); // Convert to Base64 string
        } else {
          recipe.Image = null; // Handle case with no image or incorrect type
        }
      });
    }
    return meals;
  } catch (err) {
    throw new Error(`Error fetching liked recipes: ${err.message}`);
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
  addMeal,
  getRecipe,
  getLikedRecipes,
  getAllergies
};
