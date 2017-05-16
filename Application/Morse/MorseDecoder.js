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

	addSignal(morseSignal) {
		console.log("Morse Signal: " + morseSignal);
		console.log("Morse code: " + this.morseCode);
		if (morseSignal == morse.letterGapSym) {
			let decodedLetter = morse.table[this.morseCode];
			this.morseCode = "";
			return decodedLetter;
		} else if (morseSignal == morse.wordGapSym) {
			let decodedLetter = morse.table[this.morseCode];
			this.morseCode = "";
			if ( decodedLetter != null ) {
				return decodedLetter + " ";
			} else {
				return null;
			}
		} else {
			this.morseCode += morseSignal;
		}	
	}
}

module.exports = MorseDecoder;
