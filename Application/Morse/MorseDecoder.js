/*
*MorseDecoder decodes the morse signal into a character
**
*@author: Thanh Doan
*/
let morse = require.main.require("./config.morse.js");

class MorseDecoder {
	constructor() {
		this.morseCode = "";
		this.currentSignal = '';
	}

	addSignal(morseSignal) {
		if (morseSignal == morse.letterGapSym) {
			let decodedLetter = morse.table[morseCode];
			morseCode = "";
			return decodedLetter;
		} else if (morseSignal == morse.wordGapSym) {
			let decodedLetter = morse.table[morseCode];
			morseCode = "";
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
