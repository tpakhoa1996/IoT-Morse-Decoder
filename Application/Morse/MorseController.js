/*
*Morse Controller processes the received morse signals and 
*upload to database
*
*@author: Thanh Doan
*/

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
	logger.log("info", "A morse signal received: ", morseSignal);
	let decodedString = morseDecoder.addSignal(morseSignal);

	if (decodedString != null){
		logger.log("info","A string has been decoded", decodedString);
		database.uploadMessage(decodedString);	
	}		
	
}


