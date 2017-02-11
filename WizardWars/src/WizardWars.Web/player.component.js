var Player = function(param){
	var self = Entity(param);
	self.id = param.id;
	self.number = "" + Math.floor(10 * Math.random());
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.pressingAttack = false;
	self.mouseAngle = 0;
	self.maxSpd = 10;
    self.hp = 10;
    self.hpMax = 10;
    self.score = 0;
	
	var super_update = self.update;
	self.update = function(){
		self.updateSpd();
		super_update();
		
		if(self.pressingAttack){
			self.shootBullet(self.mouseAngle);
		}
	}
	self.shootBullet = function(angle){
		Bullet({
            parent:self.id,
            angle:angle,
            x:self.x,
		    y:self.y,
            map:self.map,
        });
	}
	
	self.updateSpd = function(){
		if(self.pressingRight)
			self.spdX = self.maxSpd;
		else if(self.pressingLeft)
			self.spdX = -self.maxSpd;
		else
			self.spdX = 0;
		
		if(self.pressingUp)
			self.spdY = -self.maxSpd;
		else if(self.pressingDown)
			self.spdY = self.maxSpd;
		else
			self.spdY = 0;		
	}
    
    self.getInitPack = function(){
        return {
            id:self.id,
		    x:self.x,
		    y:self.y,	
		    number:self.number,	 
            hp:self.hp,
            hpMax:self.hpMax,  
            score:self.score, 
            map:self.map,
        };
    }

    self.getUpdatePack = function(){
        return {
            id:self.id,
		    x:self.x,
		    y:self.y,	
            score:self.score,  
            hp:self.hp,  
        };
    }
   
	Player.list[self.id] = self;
	
	initPack.player.push(self.getInitPack());
    
	return self;
}