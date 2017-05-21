let five = require("johnny-five"),
	Events = require("events"),
	Winston = require("winston"),
	MotionTranslator = require("./MotionTranslator.js");

let board = new five.Board(),
	signalEmitter = new Events(),
	logger = new Winston.Logger(),
	motionTranslator = new MotionTranslator(),
	database = require.main.require("./Firebase/database.js");

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
	if (morseSignal)
		signalEmitter.emit("data", {"signal": morseSignal});
};

board.on("ready", () => {
	let motion = new five.Motion(7);

	motion.on("calibrated", () => {
		logger.log("info", "Sensor calibrated at", new Date().toLocaleString());

		let signal = {
			date: new Date(),
			motion: "calibrated"
		};

		database.uploadMotionData(signal);
	});

	motion.on("motionstart", () => {
		logger.log("info", "A motion started at", new Date().toLocaleString());

		let signal = {
			date: new Date(),
			motion: "motionstart"
		};

		database.uploadMotionData(signal);

		processNewSignal(signal);
	});

	motion.on("motionend", () => {
		logger.log("info", "A motion ended at", new Date().toLocaleString());

		let signal = {
			date: new Date(),
			motion: "motionend"
		};

		database.uploadMotionData(signal);
		processNewSignal(signal);
	});
});

module.exports = signalEmitter;
