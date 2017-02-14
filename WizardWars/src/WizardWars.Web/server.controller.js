Player.onConnect = function(socket){
	var map = 'forest';
    if(Math.random() < 0.5)
        map = 'field';
    var player = Player({
        id:socket.id,
        map:map,
    });
    
	socket.on('keyPress',function(data){
		if(data.inputId === 'left')
			player.pressingLeft = data.state;
		else if(data.inputId === 'right')
			player.pressingRight = data.state;
		else if(data.inputId === 'up')
			player.pressingUp = data.state;
		else if(data.inputId === 'down')
			player.pressingDown = data.state;
		else if(data.inputId === 'attack')
			player.pressingAttack = data.state;
		else if(data.inputId === 'mouseAngle')
			player.mouseAngle = data.state;
	});
    
    socket.emit('init', {
       selfId:socket.id,
       player:Player.getAllInitPack(),
       bullet:Bullet.getAllInitPack(), 
    });
}