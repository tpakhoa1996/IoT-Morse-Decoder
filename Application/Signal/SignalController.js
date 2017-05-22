/*
 * This module will read in the motion signal from the sensor and send it
 * to MotionTranslator to get back the morse signal. Then the morse signal
 * will be emitted out.
 *
 * This module also help client control tranmission process and detect 
 * when we meet a SK signal
 *
 * @author: Khoa (Brian) Tran - patra3@student.monash.edu
 */

let five = require("johnny-five"),
	Events = require("events"),
	Winston = require("winston"),
	MotionTranslator = require("./MotionTranslator.js");

let board = new five.Board(),
	signalEmitter = new Events(),
	logger = new Winston.Logger(),
	motionTranslator = new MotionTranslator(),
	Signal = require("../models/Signal.model.js"),
	sensorControlRef = require("../models/database.js").ref("SensorControl"),
	morse = require("../config.morse.js");

// Configure logger
logger.configure({
	transports: [
		new (Winston.transports.Console)({
			name: "signal-console",
			level: "info"
		}),
		new (Winston.transports.File)({
			name: "signal-file",
			filename: "signal-info.log",
			level: "info"
		}),
		new (Winston.transports.File)({
			name: "signal-handler-error",
			filename: "signal-error.log",
			level: "error"
		})
	]
});

// Control input from PIR motion sensor
let processNewSignal = (signal) => {
	motionTranslator.newSignal(signal);
	let morseSignal = motionTranslator.getMorseSignal();
	if (morseSignal) {
		let signal = new Signal("morse", morseSignal, new Date());
		signalEmitter.emit("data", signal.getObject());
		signal.save();
	}
};


// Initiate the SK signal
let skSignal = ["dot", "dot", "dot", "dash", "dot", "dash"];


// This variable is used to store the last six morse signal in order to
// check whether we reach a SK signal
let lastMorseSignals = "";

// Listen to when a new morse signal is sent out
signalEmitter.on("data", (morseSignal) => {

	// Update lastMorseSignals
	lastMorseSignals += morseSignal.signal;
	if (lastMorseSignals.length > 6)
		lastMorseSignals = lastMorseSignals.slice(1);


	// Test whether we have received 6 morse signals to be able 
	// receive a SK signal
	if (lastMorseSignals.length == 6) {

		// Check whether or not we reached a SK signal
		let isSkSignal = true;
		skSignal.forEach( (signal, index) => {
			signal = morse[signal + "Sym"];
			if (lastMorseSignals[index] != signal) {
				isSkSignal = false;
				return false;
			}
		});

		if (isSkSignal) {
			// If a SK signal is received, set sensor to off
			sensorControlRef.update({
				"value": "off"
			});
			let signal = new Signal("morse", "SK, End of transmission", new Date());

			// Upload the signal to firebase
			signal.save();
		}
	}
});

// Listen to when the board is ready
board.on("ready", () => {
	let motion = new five.Motion(7);
	let lastMotionSignal = null;

	// Listen to when the sensor is toggled
	sensorControlRef.on("value", (snap) => {

		// Check whether the sensor is set to on or off or undefined
		data = snap.val();
		if (data == null || (data.value != "on" && data.value != "off")) {
			// Sensor status is undefined => Set status to off
			sensorControlRef.update({
				value: "off"
			});
			return;
		} else if (data.value == "off") {
			// Sensor is set to off => execute procedure to
			// stop transmission
			// Emit "motionend" if there is an ongoing motion
			if (lastMotionSignal == "motionstart")
				motion.emit("motionend");
			// Remove all listeners of event motion so that
			// notthing can hear heard from motion sensor
			motion.removeAllListeners();
			// reset SK signal checking process
			lastMorseSignals = "";
			return;
		}

		// Throw away the old emitter
		motion = new five.Motion(7);
		// Create a new translator
		motionTranslator = new MotionTranslator();
		// This variable is used to prevent the situation when a motionend
		// is heard before any motionstart
		lastMotionSignal = null;


		// Listen to the event emmited when the motion sensor 
		// is ready to work
		// This function will send this signal to firebase
		motion.on("calibrated", () => {
			logger.log("info", "The sensor calibrated at", new Date().toLocaleString());

			let signal = new Signal("motion", "calibrated", new Date());
			signal.save();

		});


		// Listen to the event when a motion is detected by motion sensor
		// This function will send this signal to firebase and
		// MotionTranslator
		motion.on("motionstart", () => {
			lastMotionSignal = "motionstart";

			logger.log("info", "Motion started at", new Date().toLocaleString());

			let signal = new Signal("motion", "motionstart", new Date());
			signal.save();

			processNewSignal(signal.getObject());
		});


		// Listen to the event when a motion has stopped
		// This function will send this signal to firebase and
		// MotionTranslator
		motion.on("motionend", () => {
			if (lastMotionSignal != "motionstart")
				return;

			lastMotionSignal = "motionend";

			logger.log("info", "Motion ended at", new Date().toLocaleString());

			let signal = new Signal("motion", "motionend", new Date());
			signal.save();

			processNewSignal(signal.getObject());
		});
	});
});




// Return the event emitter
module.exports = signalEmitter;
