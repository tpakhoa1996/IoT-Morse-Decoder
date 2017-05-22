/**
*Unit test for the MorseDecoder
*
*@author: Thanh Doan
*/
var chai = require('chai');
var expect = chai.expect;
var MorseDecoder = require("../../Morse/MorseDecoder.js");

var decoder = new MorseDecoder();

describe('Morse Decoder', function() {
		var testSignalString = "SL_LSS&LLL&LLS_";
		var result = "";
		it('Should be able to decode the signal into English words',function() {
			for (var i=0; i < testSignalString.length; i++) {
				var character = decoder.addSignal(testSignalString[i]);
				if (character != null) {
					result += character;
				}
			}
			
		expect(result).to.equal("A DOG ");
		});
});
