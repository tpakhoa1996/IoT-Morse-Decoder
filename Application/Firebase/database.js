let firebaseAdmin = require("firebase-admin"),
	serviceAccount = require("./serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://morsedecoder-b6db6.firebaseio.com"
});

let db = firebaseAdmin.database();
	messageRef = db.ref("/Message");

messageRef.remove();

exports.db = db;

exports.upload = (data) => {
	let pushKey = messageRef.push().key;
	let upData = {
		letter: data,
		date: new Date
	};
	messageRef.child(pushKey).update(upData);
};

