let	database = require.main.require("./Firebase/database.js"),
	morse = require.main.require("./config.morse.js"),
	Winston = require("winston"),
	MorseDecoder = require("./MorseDecoder");

let logger = new Winston.Logger(),
	morseDecoder = new MorseDecoder();

logger.configure({
	transports: [new Winston.transports.File({
		filename: "morse.log"
	})]
});

exports.addMorseSignal = (morseSignal) => {
	// Use morseDecoder to process the morseSignal
	// If a letter is decoded then it will be sent to database
	// log out the process
}
