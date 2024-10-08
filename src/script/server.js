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

const express = require("express");
const api_db = require("../database/api_db");
const init_db = require("../database/init_db");
const hostname = "127.0.0.1";
const port = 3000;

const server = express();

// Function to link to the request getMostLiked
server.get("/getMostLiked", async (req, res) => {
  res.send(await api_db.getMostLiked(10));
});

// Function to activate the initialisation of the database
server.get("/initdb", async (req, res) => {
  await init_db.doAll();
  res.send("Database initialized");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
