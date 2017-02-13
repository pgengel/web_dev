socket.on('remove', function(data){
    //{player:[12323],bullet:[12323,123123]}
    for(var i = 0 ; i < data.player.length; i++){
        delete Player.list[data.player[i]];
    }
    for(var i = 0 ; i < data.bullet.length; i++){
        delete Bullet.list[data.bullet[i]];
    }
});
