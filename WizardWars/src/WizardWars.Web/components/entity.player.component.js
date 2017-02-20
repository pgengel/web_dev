var BulletCom = require('./entity.bullet.component');
var BulletUpdate = require('../bullet-update.service');

module.exports = function (id, BulletCom){
    
    var self = {
        x              : 250,
        y              : 250,
        id             : id,
        number         : "" + Math.floor(10 * Math.random()),
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
            if(self.pressingAttack){
                self.shootBullet(self.mouseAngle); 
            }
            

        },
        
        shootBullet : function(angle) {
            var bulletCom = BulletCom();
            bulletCom.x = self.x;
            bulletCom.y = self.y;
        },

        getDistance : function(pt){
		    return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
	    },
        getInitPack : function(){
            return {
                id:self.id,
                x:self.x,
                y:self.y,
                map:self.map,
            }
        },
        getUpdatePack : function(){
            return {
                id:self.id,
                x:self.x,
                y:self.y,
            };
        }  
    };

    return self;
    
};

