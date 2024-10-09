// ------------------------------
//  Karot_2.0 - like_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions needed 
//  to like and unlike recipes
// ------------------------------

const mysql = require("mysql2");
const serv = { 
  host: "concordia-db.docsystem.xyz",
  user: "uml-b-3",
  password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
  database: "uml-b-3",
};

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
    )
  });
}

module.exports = { likeRecipe, unlikeRecipe }
