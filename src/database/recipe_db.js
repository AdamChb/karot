// ------------------------------
//  Karot_2.0 - api_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions linked with the table Recipe in the database.
// ------------------------------

const mysql = require("mysql2");

function getRecipe(id) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM Recipe WHERE ID_Recipe = ?",
      [id],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

function getRecipes(id_user, id_start, nb_recipes, search = "") {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  const condition = search === "" ? "" : "WHERE r.Name_Recipe LIKE ?";
  const query = `SELECT 
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
      ${condition}
      GROUP BY r.ID_Recipe, r.Name_Recipe, r.Steps, r.Category, r.Image, ku.Username, tl.ID_User
      LIMIT ?, ?`;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      search === ""
        ? [parseInt(id_user), parseInt(id_start), parseInt(nb_recipes)]
        : [
            parseInt(id_user),
            "%" + search + "%",
            parseInt(id_start),
            parseInt(nb_recipes),
          ],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}
function searchRecipe(name = "") {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  const query =
    name === ""
      ? "SELECT * FROM Recipe"
      : "SELECT * FROM Recipe WHERE Name_Recipe LIKE %?%";
  return new Promise((resolve, reject) => {
    db.query(query, name === "" ? [] : [name], (err, results) => {
      db.end();
      if (err) return reject(err);
      return resolve(results);
    });
  });
}
module.exports = { getRecipe, getRecipes, searchRecipe };
