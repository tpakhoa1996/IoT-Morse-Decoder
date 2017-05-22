let firebaseAdmin = require("firebase-admin"),
serviceAccount = require("./serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://morsedecoder-b6db6.firebaseio.com"
});

let database = firebaseAdmin.database();

// Clear data when turnning on
database.ref().remove();
	
// Function to communicate with Application
module.exports = database;
