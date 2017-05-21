let morse = require.main.require("./config.morse.js");

let motionSignal = {
	motionstart: "gap",
	motionend: "mark"
};

class MotionTranslator {
	constructor() {
		this.prevSignal = null;
		this.currentSignal = null;
		this.currentType = null;
	}

	newSignal(signal) {
		this.prevSignal = this.currentSignal;
		this.currentSignal = signal.date;
		this.currentType = motionSignal[signal.motion];
	}

	getMorseSignal() {
		if (this.prevSignal == null)
			return null;
		let len = this.currentSignal - this.prevSignal;
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

module.exports = MotionTranslator;
