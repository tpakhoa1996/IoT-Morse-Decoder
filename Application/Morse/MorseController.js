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
	// Use morseDecoder to process the morseSignal
	// If a letter is decoded then it will be sent to database
	// log out the process
	let c = morseDecoder.addSignal(morseSignal);
	console.log("Decoded mess: " + c);
	if (c != null){
		logger.log("info","A character has been decoded", c);
		database.uploadMessage(c);	
	}		
	
}


