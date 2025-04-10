// ------------------------------
//  Karot_2.0 - server.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions to connect the
//  request functions to the database server.
// ------------------------------

// Require is the keyword used to import modules
// You can import local files by using the relative path

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api_db = require("../database/api_db");
const account_db = require("../database/account_db");
const to_like_db = require("../database/to_like_db");
const recipe_db = require("../database/recipe_db");
const to_require_db = require("../database/to_require_db");
const ingredient_db = require("../database/ingredient_db");

// Configuration about the server
const hostname = "127.0.0.1";
const port = 3000;

// Create a new instance of express
const server = express();

server.use(cors("*"));
server.use(bodyParser.json());

// When a GET requets is made at the adress /getMostLiked, the server respond (res) with the return of the function getMostLiked

// Function to link to the request getMostLiked
server.get("/api/get-most-liked", async (req, res) => {
  const userId = req.query.userId;
  res.send(await api_db.getMostLiked(4, userId));
});

server.get("/api/get-recipes", async (req, res) => {
  const { id_start, nb_recipes } = req.query;
  try {
    const answer = await recipe_db.getRecipes(id_start, nb_recipes);
    answer.forEach((recipe) => {
      recipe.Image = recipe.Image.toString("base64");
    });
    res.send(answer);
  } catch (error) {
    console.log(error);
    res.status(500).send;
  }
});


server.get("/api/search-recipe", async (req, res) => {
  const { search } = req.query;
  try {
    const answer = await recipe_db.searchRecipe(search);
    answer.forEach((recipe) => {
      recipe.Image = recipe.Image.toString("base64");
    });
    res.send(answer);
  } catch (error) {
    console.log(error);
    res.status(500).send;
  }
});

server.get("/api/ingredients", async (req, res) => {
  try {
    res.send(await ingredient_db.getAllIngredients());
  } catch (error) {
    res.status(500).send;
  }
});

server.get("/api/search-ingredients", async (req, res) => {
  const { search } = req.query;
  try {
    res.send(await ingredient_db.searchIngredient(search));
  } catch (error) {
    res.status(500).send;
  }
});

server.get("/api/get-required-meal", async (req, res) => {
  const { ingredientId } = req.query;
  try {
    res.send(await to_require_db.getRequiredMeal(ingredientId));
  } catch (error) {
    res.status(500).send;
  }
});

// Add an allergy
server.post("/api/add-allergy", async (req, res) => {
  console.log(req.body);
  const { userId, ingredientId } = req.body; // Expect data from the request body
  try {
    const result = await api_db.addAllergy(userId, ingredientId);
    res.status(200).send(result); // Send success response
  } catch (error) {
    res.status(400).json({ message: error.message }); // Send error response
  }
});


// Delete an allergy
server.delete("/api/delete-allergy", async (req, res) => {
  const { userId, ingredientId } = req.query;
  try {
    const result = await api_db.deleteAllergy(userId, ingredientId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a user's allergies
server.get("/api/get-allergies", async (req, res) => {
  const userId = req.query.userId;
  try {
    const result = await api_db.getAllergies(userId);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Get a user with his id
server.get("/api/get-user", async (req, res) => {
  const id = req.query.id_user;

  try {
    const result = await account_db.getUsername(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Register a new user
server.post("/api/new-user", async (req, res) => {
  const user = req.body;
  try {
    const result = await account_db.signUp(user);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Log in a user
server.post("/api/log-in", async (req, res) => {
  const info = req.body;
  try {
    const result = await account_db.logIn(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Fetch random recipes
server.get("/api/random-recipes", async (req, res) => {
  try {
    const result = await api_db.getRandomRecipes(5, req.query.userId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a recipe
server.post("/api/add-recipe", async (req, res) => {
  const { name, ingredients, steps, ID_Creator } = req.body; // Expect data from the request body
  try {
    const result = await api_db.addRecipe(name, ingredients, steps, ID_Creator);
    res.status(200).json({ message: result }); // Send success response as JSON
  } catch (error) {
    res.status(400).json({ message: error.message }); // Send error response as JSON
  }
});



// Check Meal
server.delete("/api/check-meal", async (req, res) => {
  const { userId, recipeId } = req.query;
  try {
    const result = await api_db.checkMeal(userId, recipeId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Planned Meals
server.get("/api/get-planned-meals", async (req, res) => {
  const userId = req.query.userId;
  res.send(await api_db.getPlannedMeals(userId));
});

// Get Liked Recipes
server.get("/api/get-liked-recipes", async (req, res) => {
  const userId = req.query.userId;
  res.send(await api_db.getLikedRecipes(userId));
});

// Add a meal
server.post("/api/add-meal", async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    const result = await api_db.addMeal(userId, recipeId);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Register a new user
server.post("/api/new-user", async (req, res) => {
  const user = req.body;
  try {
    const result = await account_db.signUp(user);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Log in a user
server.post("/api/log-in", async (req, res) => {
  const info = req.body;
  try {
    const result = await account_db.logIn(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Get an specific recipe by id
server.get("/api/get-recipe", async (req, res) => {
  const id_user = req.query.id_user;
  const id_recipe = req.query.id_recipe;
  try {
    const result = await api_db.getRecipe(id_user, id_recipe);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Like a recipe
server.post("/api/like-recipe", async (req, res) => {
  const {id_user, id_recipe} = req.body;
  try {
    const result = to_like_db.likeRecipe(id_user, id_recipe);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Unlike a recipe
server.delete("/api/unlike-recipe", async (req, res) => {
  const {id_user, id_recipe} = req.query;
  try {
    const result = to_like_db.unlikeRecipe(id_user, id_recipe);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

server.get("/api/get-likes", async (req, res) => {
  const id_recipe = req.query.id_recipe;
  try {
    const result = to_like_db.getLikes(id_recipe);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

server.get("/api/has-liked", async (req, res) => {
  const { id_user, id_recipe } = req.query;
  try {
    const result = to_like_db.isLiked(id_user, id_recipe);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

server.get("/api/get-search-results", async (req, res) => {
  const userId = req.query.userId;
  var search = "";
  try {
    search = req.query.search;
  } catch (error) {
    search = "";
  }
  const id_start = 0;
  const nb_recipes = 5;
  try {
    let recipe_result = await recipe_db.getRecipes(
      userId,
      id_start,
      nb_recipes,
      search
    );
    for (let i = 0; i < recipe_result.length; i++) {
      if (recipe_result[i].Image == null) {
        recipe_result[i].Image = null;
      } else {
        recipe_result[i].Image = recipe_result[i].Image.toString("base64");
      }
    }

    // if (recipe_result.length < nb_recipes) {
    //   const ingredient_result = await ingredient_db.searchIngredients(search);
    //   ingredient_result.forEach(async (ingredient) => {
    //     const match_recipe_result = await to_require_db.getRequiredRecipe(
    //       ingredient.ID_Ingredient
    //     );
    //     for (let j = 0; j < match_recipe_result.length; j++) {
    //       match_recipe_result[j].Image = match_recipe_result[j].Image.toString("base64");
    //       match_recipe_result[j].Has_Liked = (await to_like_db.isLiked(
    //         userId,
    //         match_recipe_result[j].ID_Recipe
    //       ))
    //         ? true
    //         : false;
    //         match_recipe_result[j].Likes_Count = await to_like_db.getLikes(match_recipe_result[j].ID_Recipe);
    //         match_recipe_result[j].Author_Name = await account_db.getUsername(match_recipe_result[j].ID_Creator);
    //       if (recipe_result.includes(match_recipe_result[j])) return;
    //       recipe_result.push(match_recipe_result[j]);
    //       if (recipe_result.length == nb_recipes) return;
    //     };
    //     if (recipe_result.length == nb_recipes) return;
    //   });
    // }
    res.send(recipe_result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

server.get("/api/generateMeal", async (req, res) => {
  const userId = req.query.userId;
  const ingredients = req.query.ids;
  try {
    const result = await to_require_db.getGenerateMeals(userId, ingredients);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// The same method exist with POST, PUT and DELETE
// Request body is in req.body, it contains all the data sent by the client in the request body

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
