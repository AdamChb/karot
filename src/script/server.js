const express = require("express");
const api_db = require("./api_db");
const init_db = require("./init_db");
const hostname = "127.0.0.1";
const port = 3000;

const server = express();

server.get("/getMostLiked", async (req, res) => {
  res.send(await api_db.getMostLiked(10));
});

server.get("/initdb", async (req, res) => {
  await init_db.doAll();
  res.send("Database initialized");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
