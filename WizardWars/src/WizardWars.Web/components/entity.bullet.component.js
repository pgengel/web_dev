module.exports = function(param){
    var self = {
        x              : 250,
        y              : 250,
        id             : Math.random(),
        number         : "" + Math.floor(10 * Math.random()), 
        maxSpd 		   : 10,
        hp 			   : 10,
        hpMax 		   : 10,
        score          : 0,
        angle          : param.angle,
        spdX           : Math.cos(param.angle/180*Math.PI) * 10,
        spdY           : Math.sin(param.angle/180*Math.PI) * 10,
        parent         : param.parent,
        timer          : 0,
        toRemove       : false,
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
        },
        getDistance   : function(pt){
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


	// self.update = function(){
	// 	if(self.timer++ > 100)
	// 		self.toRemove = true;
		
	// 	for(var i in Player.list){
	// 		var p = Player.list[i];
	// 		if(self.map === p.map && self.getDistance(p) < 32 && self.parent !== p.id){
	// 			//handle collision. ex: hp--;
    //             p.hp -= 1;
                
    //             if(p.hp <= 0){
    //                 var shooter = Player.list[self.parent];
    //                 if(shooter)
    //                     shooter.score += 1;
    //                 p.hp = p.hpMax;
    //                 p.x = Math.random() * 500;
    //                 p.y = Math.random() * 500;
				   
    //             }
    //             self.toRemove = true;
	// 		}
	// 	}
	// }
    
}