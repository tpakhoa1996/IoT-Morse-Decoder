let firebaseAdmin = require("firebase-admin"),
	serviceAccount = require("./serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://morsedecoder-b6db6.firebaseio.com"
});

let db = firebaseAdmin.database();
	messageRef = db.ref("/Message"),
	motionDataRef = db.ref("/MotionData");

// Clear data when turnning on
messageRef.remove();
motionDataRef.remove();

// Function to communicate with Application
exports.uploadMessage = (data) => {
	let pushKey = messageRef.push().key;
	let upData = {
		letter: data,
		date: new Date
	};
	messageRef.child(pushKey).update(upData);
};

exports.uploadMotionData = (data) => {
	let pushKey = motionDataRef.push().key;
	motionDataRef.child(pushKey).update(data);
};

