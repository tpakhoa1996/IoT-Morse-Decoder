/*
*MorseDecoder decodes the morse signal into a character
**
*@author: Thanh Doan
*/
let morse = require.main.require("./config.morse.js");

class MorseDecoder {
	constructor() {
		this.morseCode = "";
	}

	setSignal(morseSignal) {
		this.morseCode = morseSignal;	
	}
	
	decode() {
		if (this.morseCode == "") {
			//if the received morse code is empty
			console.log("Morse signal not received!");
			return null;
		} else {
			//return the character according the the morse table in config.morse.js
			return morse.table[this.morseCode];
		}
	}
}

module.exports = MorseDecoder;
