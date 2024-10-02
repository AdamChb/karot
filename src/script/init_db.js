//Load HTTP module
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

//Load File System module
const fs = require("fs");

//Load MySQL module
const mysql = require("mysql");

const axios = require("axios");
const path = require("path");

function APIIngredientCall() {
  // API link to get all ingredients
  const linkIngredients =
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  return axios.get(linkIngredients).then((response) => {
    const ingredients = response.data.meals.map((meal) => meal.strIngredient);
    return ingredients;
  });
}

function APIMealCall(letter) {
  // API link to get meals starting with the given letter
  const linkMeals = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;

  return axios.get(linkMeals).then((response) => {
    const mealsData = response.data.meals;
    if (!mealsData) return [];

    var list = [];

    mealsData.forEach((meal) => {
      let ingredients = {};
      ingredients[meal.strIngredient1] = meal.strMeasure1;

      let count = 2;
      while (count <= 20 && meal[`strIngredient${count}`]) {
        ingredients[meal[`strIngredient${count}`]] = meal[`strMeasure${count}`];
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

    return meals;
  });
}

function insertIngredient(list) {
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
}

function getLinkImage(letter, number) {
  return path.join(__dirname, `img/${letter}/${letter}${number}.jpg`);
}

function saveImagesRecipes(letter, number, link) {
  const newPath = getLinkImage(letter, number);
  if (!link) return newPath;

  return axios
    .get(link, { responseType: "arraybuffer" })
    .then((response) => {
      if (!fs.existsSync("img")) fs.mkdirSync("img");
      if (!fs.existsSync(`img/${letter}`)) fs.mkdirSync(`img/${letter}`);
      fs.writeFileSync(newPath, response.data);
      return newPath;
    })
    .catch((err) => console.error(err));
}

async function doAll() {
  // Get the ingredients and insert them into the database

  // Database connection
  const db = mysql.createConnection({
    host: "localhost",
    user: "karot_root",
    password: "efreikarot240",
    database: "karot",
  });

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

  db.end();
}

doAll();

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
