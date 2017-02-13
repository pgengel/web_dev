var selfId = null;

socket.on('init', function(data){	
    //{ player : [{id:123,number:'1',x:0,y:0},{id:1,number:'2',x:0,y:0}], bullet: []}
    if(data.selfId)
        selfId = data.selfId;
    for(var i = 0 ; i < data.player.length; i++){
        new Player(data.player[i]);
    }
    for(var i = 0 ; i < data.bullet.length; i++){
        new Bullet(data.bullet[i]);
    }
});