$(document).ready( function() {
	var morse_code = {
		"S": "dot",
		"L": "dash",
		"&": "letter gap",
		"_": "word gap"
	};

	var db = firebase.database(),
		signalRef = db.ref("Signal"),
		messageRef = db.ref("Message");

	var signal = $("#signal"),
		message = $("#message");

	signalRef.on("child_added", function(snap) {
		var data = snap.val();
		data.date = new Date(data.date);
		
		if (data.type == "morse")
			data.signal = morse_code[data.signal];

		var output_string = "At " + data.date.toLocaleString() + ", there is a " + data.type + " signal received: " + data.signal;

		var first_element = signal.children().first();

		if (first_element.prop("tagName").toLowerCase() == "strong")
			first_element.remove();

		signal.prepend($("<p>", {
			text: output_string,
			class: "signal"
		}));
	});

	messageRef.on("child_added", function(snap) {
		var data = snap.val();
		console.log("Message get: " + data.string);

		var first_element = message.children().first();
		
		if (first_element.prop("tagName").toLowerCase() == "strong")  {
			first_element.remove();
			message.text(data.string);
		} else 
			message.text( message.text() + data.string);
	});
});
