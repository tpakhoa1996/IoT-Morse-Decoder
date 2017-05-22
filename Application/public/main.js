$(document).ready( function() {
	var morse_code = {
		"S": "dot",
		"L": "dash",
		"&": "letter gap",
		"_": "word gap"
	};

	var db = firebase.database(),
		signalRef = db.ref("Signal"),
		messageRef = db.ref("Message"),
		sensorControlRef = db.ref("SensorControl");

	var signal = $("#signal"),
		message = $("#message");

	signalRef.on("child_added", function(snap) {
		var data = snap.val();
		data.date = new Date(data.date);
		
		if (data.type == "morse" && morse_code[data.signal])
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

		var first_element = message.children();
		
		if (first_element.length > 0) {
			first_element = first_element.first();
			if (first_element.prop("tagName").toLowerCase() == "strong")  {
				first_element.remove();
				message.text(data.string);
			}
		} else 
			message.text( message.text() + data.string);
	});

	var onBtn = $("#on-btn"),
		offBtn = $("#off-btn"),
		loadingBtn = $("#loading-btn");

	function showOnBtn() {
		offBtn.hide();
		loadingBtn.hide();
		onBtn.show();
	}

	function showOffBtn() {
		onBtn.hide();
		loadingBtn.hide();
		offBtn.show();
	}

	function showLoadingBtn() {
		onBtn.hide();
		offBtn.hide();
		loadingBtn.show();
	}

	sensorControlRef.on("value", function(snap) {
		var data = snap.val();

		if (data == null)
			showLoadingBtn();
		else if (data.value == "on")
			showOnBtn();
		else if (data.value == "off")
			showOffBtn();
		else {
			sensorControlRef.update({ "value": "off" });
		}
	});

	onBtn.on("click", function() {
		showLoadingBtn();
		sensorControlRef.update({ "value": "off" });
	});

	offBtn.on("click", function() {
		showLoadingBtn();
		sensorControlRef.update({ "value": "on" });
	});

});
