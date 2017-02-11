var express = require('express');
var app = express();

//create a server
var server = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.use('/',express.static(__dirname));

server.listen(3000);

var io = require('socket.io')(server, {});
io.sockets.on('connection', function(socket){ 
    console.log('socket connection'); 
});

console.log("Server started.");

var WIDTH = 500;
var HEIGHT = 500;
var socket = io();