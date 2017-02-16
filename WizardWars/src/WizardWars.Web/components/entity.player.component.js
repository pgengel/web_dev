module.exports = function (id){
    
    var self = {
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
        updatePosition : function() {
            if(self.pressingRight){
                self.x += self.maxSpd;
            }
            if(self.pressingLeft){
                self.x -= self.maxSpd;
            }
            if(self.pressingUp){
                self.y -= self.maxSpd;
            }
            if(self.pressingDown){
                self.y += self.maxSpd;
            }
        }
    };

    return self;
    
};

