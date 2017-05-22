let database = require("./database.js"),
	messageRef = database.ref("Message");

class Message {
	constructor(string, date) {
		this.string = string;
		this.date = date;
	}

	getObject() {
		return {
			string: this.string,
			date: this.date
		};
	}

	save() {
		if (this.pushKey == null)
			this.pushKey = messageRef.push().key;
		messageRef.child(this.pushKey).update(this.getObject());
	}
}

module.exports = Message;
