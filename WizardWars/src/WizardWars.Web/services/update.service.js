socket.on('update', function(data){ //decopression needs to be handle here.
    //{ player : [{id:123,x:0,y:0},{id:1,x:0,y:0}], bullet: []}
    for(var i = 0 ; i < data.player.length; i++){
        var pack = data.player[i];
        var p = Player.list[pack.id];
        if(p){
            if(pack.x !== undefined)
                p.x = pack.x;
            if(pack.y !== undefined)
                p.y = pack.y;
            if(pack.hp !== undefined)
                p.hp = pack.hp;
            if(pack.score !== undefined)
                p.score = pack.score;
        }
    }
    for(var i = 0 ; i < data.bullet.length; i++){
        var pack = data.bullet[i];
        var b = Bullet.list[data.bullet[i].id];
        if(b){
            if(pack.x !== undefined)
                b.x = pack.x;
            if(pack.y !== undefined)
                b.y = pack.y;
        }
    }
});