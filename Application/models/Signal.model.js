let database = require("./database.js"),
	signalRef = database.ref("Signal");

class Signal {
	constructor(type, signal, date) {
		this.type = type;
		this.signal = signal;
		this.date = date;
	}

	getObject() {
		return {
			type: this.type,
			signal: this.signal,
			date: this.date
		};
	}

	save() {
		if (this.pushKey == null)
			this.pushKey = signalRef.push().key;
		signalRef.child(this.pushKey).update(this.getObject());
	}
}

module.exports = Signal;
