const mysql = require("mysql2");

async function getMostLiked(limit) {
  const db = mysql.createConnection({
    host: "localhost",
    user: "karot_root",
    password: "efreikarot240",
    database: "karot",
  });
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Recipe ORDER BY Likes DESC LIMIT ${limit}`,
      (err, results) => {
        db.end();
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

// Export the function getMostLiked
module.exports = { getMostLiked };
