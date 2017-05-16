let Express = require("express"),
	Http = require("http"),
	Winston = require("winston");


let	app = Express(),
	server = Http.createServer(app),
	logger = new Winston.Logger(),
	signalController = require("./Signal/SignalController.js");

// Configure logger
logger.configure({
	transports: [ new (Winston.transports.Console)() ]
});

signalController.on("data", (data) => {
	logger.log("info", "A morse signal received: ", data);
});


// routes
app.get("/", (req, res) => {
	logger.log("info", ("A request from" + req.ip + " to " + req.originalUrl));
	res.sendFile("index.html", { root: __dirname });
});

server.listen(8080);

