let morse = require.main.require("./config.morse.js");

class MorseSignalHandler {
	constructor() {
		this.prevSignal = null;
		this.currentSignal = null;
		this.currentType = null;
	}

	newSignal(signalType) {
		this.prevSignal = this.currentSignal;
		this.currentSignal = new Date();
		this.currentType = signalType;
	}

	getMorseSignal() {
		let len = this.currentSignal - this.prevSignal;
		if (this.currentType == "mark") {
			if (len > morse.dash)
				return morse.dashSym;
			else if (len > morse.dot)
				return more.dotSym;
		} else if (this.currentType == "gap") {
			if (len > morse.wordGap)
				return morse.wordGapSym;
			else if (len > morse.letterGap)
				return morse.letterGapSym;
		} 
		return null;
	}
}

module.exports = MorseSignalHandler;
