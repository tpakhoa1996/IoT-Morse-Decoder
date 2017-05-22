/*
 * This module defines the MotionTranslator class
 * @author: Khoa (Brian) Tran - patra3@student.monash.edu
 */

let morse = require("../config.morse.js");

let motionSignal = {
	motionstart: "gap",
	motionend: "mark"
};


/*
 * @attr {date} prevSignal - the second last time that the translator
 * receive a motion signal
 * @attr {data} currentSignal - the last time that the translator receeive
 * a motion signal
 * @attr {string} currentType - the of type of morse signal that those
 * two signal representing ("gap" or "mark")
 */
class MotionTranslator {

	/*
	 * @constructor
	 * @return {MotionTranslator} - a new object with all attributes
	 * have null value
	 */
	constructor() {
		this.prevSignal = null;
		this.currentSignal = null;
		this.currentType = null;
	}

	
	/*
	 * The method update the current attributes to the new signal.
	 * @param {object(signal, date)} - a new signal received from 
	 * motion sensor. The object.signal is the signal from the
	 * motion sensor. The object.date is the date when the signal is 
	 * received
	 */
	newSignal(signal) {
		this.prevSignal = this.currentSignal;
		this.currentSignal = new Date(signal.date);
		this.currentType = motionSignal[signal.signal];
	}


	/*
	 * Get the current morse signal formed from two last signals
	 * @return {string} - a morse signal or null if the current data 
	 * does not represent any morse signal
	 */
	getMorseSignal() {
		if (this.prevSignal == null)
			return null;

		// len is the duration between two last signals
		let len = this.currentSignal - this.prevSignal;

		// Classify the which morse signal representing current data
		if (this.currentType == "mark") {
			if (len > morse.dash)
				return morse.dashSym;
			else if (len > morse.dot)
				return morse.dotSym;
		} else if (this.currentType == "gap") {
			if (len > morse.wordGap)
				return morse.wordGapSym;
			else if (len > morse.letterGap)
				return morse.letterGapSym;
		} 
		return null;
	}
}

// Return class MotionTranslator
module.exports = MotionTranslator;
