/**
*Unit test for MorseTranslator
*
*@author: Thanh Doan
*/

var chai = require('chai');
var expect = chai.expect;
var MotionTranslator = require('../../Signal/MotionTranslator.js');
var signal = require('../../models/Signal.model.js');
var morse = require("../../config.morse.js");

describe('Motion Translator', function() {
	it('Should be able to detect short signal', function() {
		var signal = {
			signal: "motionend",
			date: new Date()
		};
		var translator = new MotionTranslator();
		translator.newSignal(signal);
		signal.date.setMilliseconds(signal.date.getMilliseconds() + morse.dot + 1);
		translator.newSignal(signal);
		var result = translator.getMorseSignal();

    	expect(result).to.equal(morse.dotSym);

    });

	it('Should be able to detect long signal', function() {
        var signal = {
            signal: "motionend",
            date: new Date()
        };
        var translator = new MotionTranslator();
        translator.newSignal(signal);
        signal.date.setMilliseconds(signal.date.getMilliseconds() + morse.dash + 1);
        translator.newSignal(signal);
        var result = translator.getMorseSignal();

        expect(result).to.equal(morse.dashSym);

    });

	it('Should be able to detect word gap', function() {
		var endSignal = {
			signal: "motionend",
			date: new Date()
		}
				
		
        var startSignal = {
            signal: "motionstart",
            date: endSignal.date.getMilliseconds() + morse.wordGap + 1,
        };

        var translator = new MotionTranslator();
        translator.newSignal(endSignal);
        translator.newSignal(startSignal);
        var result = translator.getMorseSignal();

        expect(result).to.equal(morse.wordGapSym);

    });

	it('Should be able to detect letter gap', function() {
    	var endSignal = {
            signal: "motionend",
            date: new Date()
        }
           

        var startSignal = {
            signal: "motionstart",
            date: endSignal.date.getMilliseconds() + morse.letterGap + 1,
        };
    
		var translator = new MotionTranslator();
        translator.newSignal(endSignal);
        translator.newSignal(startSignal);
        var result = translator.getMorseSignal();

        expect(result).to.equal(morse.letterGapSym);

    });

});

