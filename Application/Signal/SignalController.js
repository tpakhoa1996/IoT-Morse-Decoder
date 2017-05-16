let five = require("johnny-five"),
	Events = require("events"),
	Winston = require("winston"),
	SignalHandler = require("./MorseSignalHandler.js");

let board = new five.Board,
	signalEmitter = new Events(),
	logger = new Winston.Logger(),
	signalHandler = new SignalHandler(),
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
let processNewSignal = (signalType) => {
	signalHandler.newSignal(signalType);
	let morseSignal = signalHandler.getMorseSignal();
	if (morseSignal)
		signalEmitter.emit("data", {"signal": morseSignal});
};

board.on("ready", () => {
	let motion = new five.Motion(7),
		prevSignal = null,
		currentSignal = null;
	motion.on("calibrated", () => {
		logger.log("info", "Sensor calibrated at", new Date().toLocaleString());

		database.uploadMotionData({
			date: new Date(),
			motion: "Motion sensor calibratetd"
		});
	});

	motion.on("motionstart", () => {
		logger.log("info", "A motion started at", new Date().toLocaleString());

		database.uploadMotionData({
			date: new Date(),
			motion: "Motion started"
		});

		processNewSignal("gap");
	});

	motion.on("motionend", () => {
		logger.log("info", "A motion ended at", new Date().toLocaleString());

		database.uploadMotionData({
			date: new Date(),
			motion: "Motion ended"
		});
		processNewSignal("mark");
	});
});

module.exports = signalEmitter;
