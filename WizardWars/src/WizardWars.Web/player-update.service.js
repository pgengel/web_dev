module.exports = {
    
    updatePosition : function(PLAYER_LIST) {
            var pack = [];
                //create a package and send back to the client.
            for(var i in PLAYER_LIST){
                var player = PLAYER_LIST[i];
                player.updatePosition();
                pack.push({
                    x: player.x,
                    y: player.y,
                    number : player.number
                });        
     
            }
            return pack;  
    }
};