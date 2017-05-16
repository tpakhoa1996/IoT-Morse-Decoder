$(document).ready( function() {
	var db = firebase.database(),
		motionDataRef = db.ref("MotionData"),
		messageRef = db.ref("Message");

	var motionSensorData = $("#motion-sensor-data"),
		message = $("#message");

	motionDataRef.on("child_added", function(snap) {
		var data = snap.val();
		data.date = new Date(data.date);
		motionSensorData.prepend($("<p>", {
			text: "At " + data.date.toLocaleString() + ", there is an event: " + data.motion
		}));
	});

	messageRef.on("child_added", function(snap) {
		var data = snap.val();
		message.text( message.text() + data.string);
	});
});
