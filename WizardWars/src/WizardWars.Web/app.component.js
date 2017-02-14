// Setup Express server.
var express = require('express');
var app = express();

//create a server
var server = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

server.listen(3000);

// Setup Socket IO
var io = require('socket.io')(server, {});
io.sockets.on('connection', function(socket){ 
    // When ever there is a connection then this function will be called.
    console.log('socket connection'); 
});

console.log("Server started.");

//appController.init();

