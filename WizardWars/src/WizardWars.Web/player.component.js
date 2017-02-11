var PlayerComponent = (function(IEntity, param, CBullet){
	
    var Player = IEntity.EntityInterface(param);
	
    Player.prototype.id = param.id;
	Player.prototype.number = "" + Math.floor(10 * Math.random());
	Player.prototype.pressingRight = false;
	Player.prototype.pressingLeft = false;
	Player.prototype.pressingUp = false;
	Player.prototype.pressingDown = false;
	Player.prototype.pressingAttack = false;
	Player.prototype.mouseAngle = 0;
	Player.prototype.maxSpd = 10;
    Player.prototype.hp = 10;
    Player.prototype.hpMax = 10;
    Player.prototype.score = 0;
	
	var super_update = this.update;

	Player.prototype.update = function(){
		this.updateSpd();
		super_update();
		
		if(this.pressingAttack){
			this.shootBullet(this.mouseAngle);
		}
	}
	Player.prototype.shootBullet = function(angle){
		Bullet({
            parent:this.id,
            angle:angle,
            x:this.x,
		    y:this.y,
            map:this.map,
        });
	}
	
	Player.prototype.updateSpd = function(){
		if(this.pressingRight)
			this.spdX = this.maxSpd;
		else if(this.pressingLeft)
			this.spdX = -this.maxSpd;
		else
			this.spdX = 0;
		
		if(this.pressingUp)
			this.spdY = -this.maxSpd;
		else if(this.pressingDown)
			this.spdY = this.maxSpd;
		else
			this.spdY = 0;		
	}
    
    Player.prototype.getInitPack = function(){
        return {
            id:this.id,
		    x:this.x,
		    y:this.y,	
		    number:this.number,	 
            hp:this.hp,
            hpMax:this.hpMax,  
            score:this.score, 
            map:this.map,
        };
    }

    Player.prototype.getUpdatePack = function(){
        return {
            id:this.id,
		    x:this.x,
		    y:this.y,	
            score:this.score,  
            hp:this.hp,  
        };
    }
   
	this.list[Player.id] = this;
	
	initPack.player.push(this.getInitPack());
    
	return {Player : Player};

})(entityInterface, param, BulletComponent);