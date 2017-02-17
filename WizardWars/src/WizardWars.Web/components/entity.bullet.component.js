module.exports = function(angle){
    var self = {
        x              : 250,
        y              : 250,
        id             : Math.random(),
        maxSpd 		   : 10,
        angle          : angle,
        spdX           : Math.cos(angle/180 * Math.PI) * 10,
        spdY           : Math.sin(angle/180 * Math.PI) * 10,
        //parent         : parent,
        timer          : 0,
        toRemove       : false,
        updatePosition : function() {
            if(self.timer++ > 100){ //after 100  frames the bullet will disapear TODO: collision needs to be done here.
                self.toRemove = true;
            }
            self.angle = Math.random();
            self.spdX = Math.cos(self.angle/180 * Math.PI) * 10;
            self.spdY = Math.sin(self.angle/180 * Math.PI) * 12.25;
            //super update
            self.x += self.spdX;
            self.y += self.spdY;

        },
        getDistance   : function(pt){
		    return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
	    },
        getInitPack : function(){
            return {
                id  : self.id,
                x   : self.x,
                y   : self.y,
                map : self.map,
            }
        },
        getUpdatePack : function(){
            return {
                id  : self.id,
                x   : self.x,
                y   : self.y,
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