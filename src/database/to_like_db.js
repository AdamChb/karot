// ------------------------------
//  Karot_2.0 - api_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions linked with the table To_Like in the database.
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
      "SELECT r.ID_Recipe FROM To Like tl JOIN Recipe r ON r.ID_Recipe = tl.ID_Recipe ORDER BY tl.Likes DESC LIMIT ?",
      [limit],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

//Function to like a recipe
async function likeRecipe(info) {
  const db = mysql.createConnection(serv);
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO To_Like (ID_User, ID_Recipe) VALUES (?, ?);`,
      [info.id_user, info.id_recipe],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

// Function to unlike a recipe
async function unlikeRecipe(info) {
  const db = mysql.createConnection(serv);
  console.log("unlike_bd " + info.id_recipe + " " + info.id_user);
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM To_Like WHERE ID_User = ? AND ID_Recipe = ?;`,
      [info.id_user, info.id_recipe],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

module.exports = {
  getMostLiked,
  likeRecipe,
  unlikeRecipe,
};
