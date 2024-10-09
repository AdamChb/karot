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
const cors = require("cors")
const api_db = require("../database/api_db");
const init_db = require("../database/init_db");
const account_db = require("../database/account_db")
const like_db = require("../database/like_db")

// Configuration about the server
const hostname = "127.0.0.1";
const port = 3000;

// Create a new instance of express
const server = express();

server.use(cors('*'))
server.use(bodyParser.json())

// When a GET requets is made at the adress /getMostLiked, the server respond (res) with the return of the function getMostLiked

// Function to link to the request getMostLiked
server.get("/getMostLiked", async (req, res) => {
  res.send(await api_db.getMostLiked(10));
});

// Add an allergy
server.post("/api/add-allergy", async (req, res) => {
  const { userId, ingredient } = req.body; // Get the data sent by the form
  try {
    const result = await api_db.addAllergy(userId, ingredient);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// The same method exist with POST, PUT and DELETE
// Request body is in req.body, it contains all the data sent by the client in the request body

// Add an allergy
server.post("/api/add-allergy", async (req, res) => {
  const { userId, ingredient } = req.body; // Get the data sent by the form
  try {
    const result = await api_db.addAllergy(userId, ingredient);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
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
  const info = req.body;
  try {
    const result = await like_db.likeRecipe(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Unlike a recipe
server.delete("/api/unlike-recipe", async (req, res) => {
  const info = {
    id_user: req.query.id_user,
    id_recipe: req.query.id_recipe,
  };
  try {
    const result = await like_db.unlikeRecipe(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// The same method exist with POST, PUT and DELETE
// Request body is in req.body, it contains all the data sent by the client in the request body

// Function to activate the initialisation of the database
server.get("/initdb", async (req, res) => {
  await init_db.doAll();
  res.send("Database initialized");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
