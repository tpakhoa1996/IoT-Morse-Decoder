/*
 * This module is the entry of the application. It startts the server,
 * resolves requests from clients and glues the Signal components 
 * to Morse componens
 * @author: Khoa (Brian) Tran - patra3@student.monash.edu
 */
let Express = require("express"),
	Http = require("http"),
	Winston = require("winston");


let	app = Express(),
	server = Http.createServer(app),
	logger = new Winston.Logger(),
	signalController = require("./Signal/SignalController.js"),
	morseController = require("./Morse/MorseController.js");

// Configure middleware of an express app
app.use("/", Express.static("public"));

// Configure logger
logger.configure({
	transports: [ new (Winston.transports.Console)() ]
});

// Routes
app.get("/", (req, res) => {
	logger.log("info", ("A request from" + req.ip + " to " + req.originalUrl));
	res.sendFile("/views/main.html", {root: __dirname});
});

// Run server
server.listen(8080);
logger.log("info", "Server is listening at port 8080");

// Process data from motion sensor
signalController.on("data", (morseData) => {
	logger.log("info", ("A morse signal is received: " + JSON.stringify(morseData)));
	morseController.addMorseSignal(morseData.signal);
});


