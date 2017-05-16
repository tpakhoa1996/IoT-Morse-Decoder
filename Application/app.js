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

// Process data from motion sensor
signalController.on("data", (morseSignal) => {
	logger.log("info", "A morse signal received: ", morseSignal);
	morseController.addMorseSignal(morseSignal);
});


// Routes
app.get("/", (req, res) => {
	logger.log("info", ("A request from" + req.ip + " to " + req.originalUrl));
	res.sendFile("/views/main.html", {root: __dirname});
});

// Run server
server.listen(8080);
