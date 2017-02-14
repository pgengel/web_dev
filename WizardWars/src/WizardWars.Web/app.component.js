// Server side - This file get served from express.
// TODO: appServerSetup.init() 
// Setup Express server.
var express = require('express');
var app = express();

//create a server
var server = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log('server started on 3000.');

// Keep a list of all the sockets that are connected.
var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function(id) {
    self = {
        x : 250,
        y : 250,
        id : id,
        number : "" + Math.floor(10 * Math.random()),
        pressingRight  : false,
		pressingLeft   : false,
		pressingUp     : false,
		pressingDown   : false,
		pressingAttack : false,
		mouseAngle 	   : 0,
		maxSpd 		   : 10,
		hp 			   : 10,
		hpMax 		   : 10,
    	score          : 0,
    }

    self.updatePosition = function() {
        if(self.pressingRight){
            self.x += self.maxSpd;
            //console.log(self.pressingRight);
            //console.log(self.x);
        }
        if(self.pressingLeft){
            self.x -= self.maxSpd;
            //console.log(self.pressingLeft);
            //console.log(self.x);
        }
        if(self.pressingUp){
            self.y -= self.maxSpd;
            //console.log(self.pressingUp);
            //console.log(self.x);
        }
        if(self.pressingDown){
            self.y += self.maxSpd;
            //console.log(self.pressingDown);
            //console.log(self.x);
        }
  
    }

    return self;
};

// Setup Socket IO
var io = require('socket.io')(server, {});
io.sockets.on('connection', function(serverSocket){ 
    // When ever there is a connection then this function will be called.
    console.log('socket connection!'); 

    // ID to the socket, and add to the list.
    serverSocket.id = Math.random();
	SOCKET_LIST[serverSocket.id] = serverSocket;
    var player = Player(serverSocket.id);
    PLAYER_LIST[serverSocket.id] = player;

    //Reset the player position
    // player.x = 0;
    // player.y = 0;
    player.number = "" + Math.floor(10 * Math.random());

    serverSocket.on('disconnect', function() {
        delete SOCKET_LIST[serverSocket.id];
        delete PLAYER_LIST[serverSocket.id];
    });

    serverSocket.on('keyPress', function(data){
        if(data.inputId === 'left'){
            player.pressingLeft = data.state;
            //console.log(player.pressingLeft);
        }   
        else if(data.inputId === 'right'){
            player.pressingRight = data.state;
            //console.log(player.pressingRight);
        }
        else if(data.inputId === 'up'){
            player.pressingUp = data.state;
            //console.log(player.pressingUp);
        }
        else if(data.inputId === 'down'){
            player.pressingDown = data.state;
            //console.log(player.pressingDown);
        }
        else if(data.inputId === 'attack'){
            player.pressingAttack = data.state;
            //console.log(player.pressingAttack);
        }
        else if(data.inputId === 'mouseAngle'){
            player.mouseAngle = data.state;
            //console.log(player.mouseAngle);
        }
    });
});

// Loop 40ms   
setInterval(function(){
    var pack = [];
//     var pack = {
//         player:Player.update(),
//         bullet:Bullet.update(),
//     }
    
    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];
        player.updatePosition();
        pack.push({
            x: player.x,
            y: player.y,
            number : player.number
        });

        // clientSocket.emit('init', initPack);
        // clientSocket.emit('update', pack);
        // clientSocket.emit('remove', removePack);
    }

    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPosition', pack);
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


