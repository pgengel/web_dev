
    // Server setup
    var express = require('express');
    var app = express();

    // Create a server
    var server = require('http').Server(app);

    app.get('/',function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.use('/',express.static(__dirname));

    server.listen(3000);

    // Setup sockets.
    var io = require('socket.io')(server, {});
    io.sockets.on('connection', function(socket){ 
        console.log('socket data'); 
    });

    console.log("Server started."); 



