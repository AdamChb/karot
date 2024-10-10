// ------------------------------
//  Karot_2.0 - account_db.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions needed
//  to interact with the database for the account with authentication.
// ------------------------------

const mysql = require("mysql2");
const serv = {
  host: "concordia-db.docsystem.xyz",
  user: "uml-b-3",
  password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
  database: "uml-b-3",
};
const { hashPassword, verifyPassword } = require("./password");

//Function to add the user info inside the database
async function signUp(user) {
  const db = mysql.createConnection(serv);
  return new Promise((resolve, reject) => {
    // Hash the password
    hashPassword(user.password)
      .then((hashedPassword) => {
        // Post the information
        db.query(
          `INSERT INTO Karot_User(Username, Email, Password) VALUES (?,?,?)`,
          [user.name, user.email, hashedPassword],
          (err, results) => {
            db.end();
            if (err) return reject(err);
            return resolve(results);
          }
        );
      })
      .catch(reject);
  });
}

// Function to log in the user
async function logIn(info) {
  const db = mysql.createConnection(serv);
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Karot_User WHERE Email = ?`,
      [info.email],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        if (results.length === 0) return reject("User not found");
        verifyPassword(info.password, results[0].Password)
          .then((match) => {
            if (match) return resolve(results[0]);
            return reject("Incorrect password");
          })
          .catch(reject);
      }
    );
  });
}

async function getUsername(id) {
  const db = mysql.createConnection({
    host: "concordia-db.docsystem.xyz",
    user: "uml-b-3",
    password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
    database: "uml-b-3",
  });
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT Username FROM Karot_User WHERE ID_User = ?",
      [id],
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

module.exports = { signUp, logIn, getUsername };
