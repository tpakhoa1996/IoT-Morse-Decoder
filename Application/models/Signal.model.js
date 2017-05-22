let database = require("./database.js"),
	signalRef = database.ref("Signal");

class Signal {

	/*
	 * Represent a signal can be either motion signal or morse signal
	 * @constructor
	 * @param {type} string - type of the signal "morse" or "motion"
	 * @param {signal} string - signal from motion sensor or morse signal depending on type
	 * @param {date} date - the date when the signal is generated
	 * @return {Message} - a new object with given value
	 */
	constructor(type, signal, date) {
		this.type = type;
		this.signal = signal;
		this.date = date;
	}


	/*
	 * @return {Object} - a new object contains all attributes
	 */
	getObject() {
		return {
			type: this.type,
			signal: this.signal,
			date: this.date
		};
	}


	/*
	 * Upload the object to firebase if not existed. Ortherwise this method
	 * will update the content of this object on firebase
	 */
	save() {
		if (this.pushKey == null)
			this.pushKey = signalRef.push().key;
		signalRef.child(this.pushKey).update(this.getObject());
	}
}

// Return the class
module.exports = Signal;
