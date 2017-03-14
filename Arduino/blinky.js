var j5 = require("johnny-five");
var board = new j5.Board({port: "COM8"});

var LEDPIN = 13;
var OUTPUT = 1;

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

board.on("ready", function(){
  // Set pin 13 to OUTPUT mode
  this.pinMode(LEDPIN, OUTPUT);
    board.digitalWrite(LEDPIN, 0);
});

//We need a function which handles requests and send response
function handleRequest(request, response){
	var splittedPath = request.url.split('/');
	try {
		var value = splittedPath.pop();
	    board.digitalWrite(LEDPIN, value == 'on');
	} catch (error) {
		response.end('error');
	}
    	
    response.end('It Works!! Path Hit: ' + request.url);
    
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});