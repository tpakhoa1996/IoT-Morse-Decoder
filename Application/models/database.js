/*
 * This module wil create connection to firebase which will be used in
 * the whole application
 *
 * @author: Khoa (Brian) Tran
 * @return: database connection
 */
let firebaseAdmin = require("firebase-admin"),
serviceAccount = require("./serviceAccountKey.json");

// authenticate and connect to firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://morsedecoder-b6db6.firebaseio.com"
});

// Get a database connection
let database = firebaseAdmin.database();

// Clear old data that existed in firebase
database.ref().remove();
	
// Return database connection
module.exports = database;
