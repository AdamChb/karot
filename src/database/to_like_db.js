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
async function likeRecipe(id_user, id_recipe) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO To_Like (ID_User, ID_Recipe) VALUES (?, ?);`,
      [id_user, id_recipe],
      (err, results) => {
        console.log("liked " + id_recipe + " " + id_user);
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

// Function to unlike a recipe
async function unlikeRecipe(id_user, id_recipe) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM To_Like WHERE ID_User = ? AND ID_Recipe = ?;`,
      [id_user, id_recipe],
      (err, results) => {
        console.log("unliked " + id_recipe + " " + id_user);
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function getLikes(id_recipe) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) FROM To_Like WHERE ID_Recipe = ?;`,
      [id_recipe],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function isLiked(id_user, id_recipe) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) FROM To_Like WHERE ID_User = ? AND ID_Recipe = ?;`,
      [id_user, id_recipe],
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
  getLikes,
  isLiked,
};
