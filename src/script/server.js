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
const api_db = require("../database/api_db");
const init_db = require("../database/init_db");

// Configuration about the server
const hostname = "127.0.0.1";
const port = 3000;

// Create a new instance of express
const server = express();

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
