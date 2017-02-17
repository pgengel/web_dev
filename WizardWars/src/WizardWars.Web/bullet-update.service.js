module.exports = {
    
    updatePosition : function(BULLET_LIST) {

            var pack = [];
                //create a package and send back to the client.
            for(var i in BULLET_LIST){
                var bullet = BULLET_LIST[i];
                bullet.angle = Math.random();
                console.log(bullet);
                bullet.updatePosition();
                pack.push({
                    x: bullet.x,
                    y: bullet.y,
                });        
     
            }
            return pack;  
    }
};