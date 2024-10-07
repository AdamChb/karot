//Load File System, mysql2 and path module
const { dir } = require("console");
const fs = require("fs");
const mysql = require("mysql2");
const db = require("./start_db").db;
const path = require("path");

async function APIIngredientCall() {
  // API link to get all ingredients
  const linkIngredients =
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

  // Fetch the data from the API
  return await fetch(linkIngredients)
    // Convert the response to JSON
    .then((res) => res.json())

    // Extract the ingredients from the JSON data
    .then((data) => {
      const ingredients = data.meals.map((meal) => meal.strIngredient);
      return ingredients;
    });
}

async function APIMealCall(letter) {
  // API link to get meals starting with the given letter
  const linkMeals = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;

  // Fetch the data from the API
  return await fetch(linkMeals)
    // Convert the response to JSON
    .then((res) => res.json())

    // Extract the meals from the JSON data
    .then((data) => {
      const mealsData = data.meals;
      if (!mealsData) return [];

      // List of meals to return
      var list = [];

      mealsData.forEach((meal) => {
        // Extract the ingredients and their quantities
        let ingredients = {};

        // First ingredient, always present
        ingredients[meal.strIngredient1] = meal.strMeasure1;

        // Other ingredients, if present
        let count = 2;
        while (count <= 20 && meal[`strIngredient${count}`]) {
          ingredients[meal[`strIngredient${count}`]] =
            meal[`strMeasure${count}`];
          count++;
        }

        // Add the meal to the list
        list.push({
          name: meal.strMeal,
          category: meal.strCategory,
          steps: meal.strInstructions,
          image: meal.strMealThumb,
          ingredients: ingredients,
        });
      });

      return list;
    });
}

function insertIngredient(list) {
  // Insert a list of ingredients into the database
  const query = "INSERT INTO Ingredient (Name_Ingredient) VALUES (?)";
  list.forEach((ingredient) => {
    db.query(query, [ingredient], (err) => {
      if (err) throw err;
    });
  });
}

function insertRecipe(list) {
  list.forEach((recipe) => {
    // Insert the recipe
    db.query(
      "INSERT INTO Recipe (Name_Recipe, Category, Steps, Image, Id_Creator) VALUES (?, ?, ?, ?, ?)",
      [recipe.name, recipe.category, recipe.steps, recipe.image, 1],
      (err, results) => {
        if (err) throw err;

        const idRecipe = results.insertId;

        // Insert ingredients required for the recipe
        for (const [ingredient, quantity] of Object.entries(
          recipe.ingredients
        )) {
          // Get the id of the ingredient
          db.query(
            "SELECT Id_Ingredient FROM Ingredient WHERE Name_Ingredient = ?",
            [ingredient],
            (err, results) => {
              if (err) throw err;

              // Sometimes, the API has some empty ingredients, so we ignore them
              if (results.length === 0) return;

              const idIngredient = results[0].Id_Ingredient;

              // Insert into To_Require
              db.query(
                "INSERT INTO To_Require (Id_Ingredient, Id_Recipe, Quantity) VALUES (?, ?, ?)",
                [idIngredient, idRecipe, quantity],
                (err) => {
                  if (err) {
                    // Update the quantity if the entry already exists
                    // Sometimes, the API has some duplicate ingredients, so we update the quantity
                    db.query(
                      "UPDATE To_Require SET Quantity = ? WHERE Id_Ingredient = ? AND Id_Recipe = ?",
                      [quantity, idIngredient, idRecipe],
                      (err) => {
                        if (err) throw err;
                      }
                    );
                  }
                }
              );
            }
          );
        }
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

function saveImagesRecipes(letter, number, image) {
  const dirPath = path.join(__dirname, "img", letter);

  // Create the directory if it does not exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const imgpath = path.join(dirPath, `${letter + number}.jpg`);

  // Save the image from the last function in the directory
  fs.writeFileSync(imgpath, image);

  // Return the path to the image
  return `img/${letter + number}.jpg`;
}

async function doAll() {
  // Get the ingredients and insert them into the database

  const ingredients = await APIIngredientCall();
  insertIngredient(ingredients);

  // Lambda async function so that we can use await correctly
  // For each letter of the alphabet, get the recipes and insert them into the database
  for (let i = 97; i <= 122; i++) {
    let letter = String.fromCharCode(i);
    let meals = await APIMealCall(letter);

    // Get the images of the recipes and save them
    for (let j = 0; j < meals.length; j++) {
      meals[j].image = await getImagesRecipes(meals[j].image);
      meals[j].image = saveImagesRecipes(letter, j, meals[j].image);
    }

    // Insert the recipes into the database
    insertRecipe(meals);
  }
}

module.exports = { doAll };
