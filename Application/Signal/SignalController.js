/*
 * This module will read in the motion signal from the sensor and send it
 * to MotionTranslator to get back the morse signal. Then the morse signal
 * will be emitted out
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
	Signal = require("../models/Signal.model.js");

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

// Listen to when the board is ready
board.on("ready", () => {
	let motion = new five.Motion(7);


	// Listen to the event emmited when the motion sensor is ready to work
	// This function will send this signal to firebase
	motion.on("calibrated", () => {
		logger.log("info", "The sensor calibrated at", new Date().toLocaleString());

		let signal = new Signal("motion", "calibrated", new Date());
		signal.save();

	});


	// Listen to the event when a motion is detected by motion sensor
	// This function will send this signal to firebase and MotionTranslator
	motion.on("motionstart", () => {
		logger.log("info", "Motion started at", new Date().toLocaleString());

		let signal = new Signal("motion", "motionstart", new Date());
		signal.save();

		processNewSignal(signal.getObject());
	});


	// Listen to the event when a motion has stopped
	// This function will send this signal to firebase and MotionTranslator
	motion.on("motionend", () => {
		logger.log("info", "Motion ended at", new Date().toLocaleString());

		let signal = new Signal("motion", "motionend", new Date());
		signal.save();

		processNewSignal(signal.getObject());
	});
});


// Return the event emitter
module.exports = signalEmitter;
