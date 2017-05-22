/*
 * Definition of model Message
 *
 * @author: Khoa (Brian) Tran - patra3@student.monash.edu
 */

let database = require("./database.js"),
	messageRef = database.ref("Message");


class Message {

	/*
	 * Represent a decoded message
	 * @constructor
	 * @param {string} string - the decoded string
	 * @param {date} date - the date when the string is decoded
	 * @return {Message} - a new object with given value
	 */
	constructor(string, date) {
		this.string = string;
		this.date = date;
	}


	/*
	 * @return {Object} - a new object contains all attributes
	 */
	getObject() {
		return {
			string: this.string,
			date: this.date
		};
	}


	/*
	 * Upload the object to firebase if not existed. Ortherwise this method
	 * will update content of this object on firebase
	 */
	save() {
		if (this.pushKey == null)
			this.pushKey = messageRef.push().key;
		messageRef.child(this.pushKey).update(this.getObject());
	}
}

// Return the class
module.exports = Message;
