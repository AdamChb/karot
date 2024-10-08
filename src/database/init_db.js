// ------------------------------
//  Karot_2.0 - init_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contain the functions to fill
//  the database with the API data.
// ------------------------------

//Load HTTP module
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

//Load File System module
const fs = require("fs");

//Load MySQL module
const mysql = require("mysql2");
const path = require("path");

async function APIIngredientCall() {
  // API link to get all ingredients
  const linkIngredients =
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  return await fetch(linkIngredients)
    .then((res) => {
      res.json();
    })
    .then((data) => {
      const ingredients = data.meals.map((meal) => meal.strIngredient);
      return ingredients;
    });
}

async function APIMealCall(letter) {
  // API link to get meals starting with the given letter
  const linkMeals = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;

  return await fetch(linkMeals)
    .then((res) => {
      res.json();
    })
    .then((data) => {
      const mealsData = data.meals;
      if (!mealsData) return [];

      var list = [];

      mealsData.forEach((meal) => {
        let ingredients = {};
        ingredients[meal.strIngredient1] = meal.strMeasure1;

        let count = 2;
        while (count <= 20 && meal[`strIngredient${count}`]) {
          ingredients[meal[`strIngredient${count}`]] =
            meal[`strMeasure${count}`];
          count++;
        }

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
  const db = mysql.createConnection({
    host: "localhost",
    user: "karot_root",
    password: "efreikarot240",
    database: "karot",
  });
  const query = "INSERT INTO Ingredient (Name_Ingredient) VALUES (?)";
  list.forEach((ingredient) => {
    db.query(query, [ingredient], (err) => {
      if (err) throw err;
    });
  });
  db.end();
}

function insertRecipe(list) {
  const db = mysql.createConnection({
    host: "localhost",
    user: "karot_root",
    password: "efreikarot240",
    database: "karot",
  });
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
          db.query(
            "SELECT Id_Ingredient FROM Ingredient WHERE Name_Ingredient = ?",
            [ingredient],
            (err, results) => {
              if (err) throw err;
              if (results.length === 0) return;
            }
          );

          const idIngredient = results[0].Id_Ingredient;

          // Insert into To_Require
          db.query(
            "INSERT INTO To_Require (Id_Ingredient, Id_Recipe, Quantity) VALUES (?, ?, ?)",
            [idIngredient, idRecipe, quantity],
            (err) => {
              if (err) {
                // Update the quantity if the entry already exists
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
      }
    );
  });
  db.end();
}

function getLinkImage(letter, number) {
  return path.join(__dirname, `img/${letter}/${letter}${number}.jpg`);
}

async function saveImagesRecipes(letter, number, link) {
  const newPath = getLinkImage(letter, number);
  if (!link) return newPath;

  return await fetch(link)
    .then((res) => {
      res.blob();
    })
    .then((img) => {
      if (!fs.existsSync("img")) fs.mkdirSync("img");
      if (!fs.existsSync(`img/${letter}`)) fs.mkdirSync(`img/${letter}`);
      fs.writeFileSync(newPath, img.data);
      return newPath;
    })
    .catch((err) => console.error(err));
}

async function doAll() {
  // Get the ingredients and insert them into the database

  const ingredients = await APIIngredientCall();
  insertIngredient(ingredients);

  // For each letter of the alphabet, get the recipes and insert them into the database
  for (let i = 97; i <= 122; i++) {
    let letter = String.fromCharCode(i);
    let meals = await APIMealCall(letter);

    for (let j = 0; j < meals.length; j++) {
      meals[j].image = await saveImagesRecipes(letter, j, meals[j].image);
    }

    insertRecipe(meals);
  }
}

module.exports = { doAll };
