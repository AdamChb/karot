// ------------------------------
//  Karot_2.0 - Password.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions to hash and verify passwords.
// ------------------------------

const bcrypt = require('bcrypt');

// Function to hash the password before save it into the database
async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Mot de passe haché :', hash); // TEMP: A supprimer
    return hash;
  } catch (err) {
    console.error(err);
  }
}

// Function to verify the password when the user logs in
async function verifyPassword(password, hashedPassword) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) { // TEMP: A supprimer
        console.log('Mot de passe correct');
      } else {
        console.log('Mot de passe incorrect');
      }
      return match;
    } catch (err) {
      console.error(err);
    }
  }

module.exports = { hashPassword, verifyPassword };

// TEMP: A supprimer !!!

// async function testPassword() {
//     const password = "admin";
  
//     // Attendre le hachage du mot de passe
//     const hashedPassword = await hashPassword(password);
  
//     // Ensuite, vérifier le mot de passe avec le hachage obtenu
//     await verifyPassword(password, hashedPassword);
//   }
  
// // Appeler la fonction de test
// testPassword();
