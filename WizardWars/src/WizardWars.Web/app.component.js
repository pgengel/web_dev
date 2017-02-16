//Server-side imports
//Server
var Server = require('./server.service');
server = Server.start();

// Import playerCom object.
var PlayerCom = require('./components/entity.player.component');
var PlayerConnServ = require('./services/player-onconnect.service');
var PlayerUpdatePosition = require('./player-update-postition');

// Keep a list of all the sockets that are connected.
var SOCKET_LIST = {};
var PLAYER_LIST = {};

// Setup Socket IO
var io = require('socket.io')(server, {});
io.sockets.on('connection', function(serverSocket){ 
    // When ever there is a connection then this function will be called.
    console.log('socket connection!'); 

    // ID to the socket, and add to the list.
    serverSocket.id = Math.random();
	SOCKET_LIST[serverSocket.id] = serverSocket;
    
    var player = PlayerCom(serverSocket.id);
    //player.number = "" + Math.floor(10 * Math.random());
    PLAYER_LIST[serverSocket.id] = player;

    var playerConnServ = PlayerConnServ(serverSocket, player);
    playerConnServ.playerOnConnect()

    serverSocket.on('disconnect', function() {
        delete SOCKET_LIST[serverSocket.id];
        delete PLAYER_LIST[serverSocket.id];
    });

});

// Loop 40ms create a package and send back to the client.    
setInterval(function(){

    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPosition', PlayerUpdatePosition.playerUpdatePosition(PLAYER_LIST));
    }
//     initPack.player = [];
//     initPack.bullet = [];
//     removePack.player = [];
//     removePack.bullet = [];

            
 }, 1000/25);

// io.socket.emit('init', {
//     selfId:socket.id,
//     player:Player.getAllInitPack(),
//     bullet:Bullet.getAllInitPack(), 
// });


