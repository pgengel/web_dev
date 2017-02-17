module.exports = {
    
    updatePosition : function(BULLET_LIST) {
            if(Math.random() < 0.1){
                        
            }
            var pack = [];
                //create a package and send back to the client.
            for(var i in BULLET_LIST){
                var bullet = BULLET_LIST[i];
                bullet.updatePosition();
                pack.push({
                    x: bullet.x,
                    y: bullet.y,
                });        
     
            }
            return pack;  
    }
};