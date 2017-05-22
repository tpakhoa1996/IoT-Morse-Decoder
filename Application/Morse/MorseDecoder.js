/*
*MorseDecoder decodes the morse signal into a string 
**
*@author: Thanh Doan
*/
let morse = require("../config.morse.js");

class MorseDecoder {
	constructor() {
		this.morseCode = "";
	}
	/**
	* addSignal
	*@return decodedLetter if a letter gap symbol is read
	*@return decodedLetter + " " if a word gap symbol is read
	*@param
	*/
	addSignal(morseSignal) {
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
