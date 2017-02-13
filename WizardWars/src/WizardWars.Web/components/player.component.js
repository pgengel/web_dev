var PlayerComponent = (function(IEntity, playerMdl, bulletMdl, CBullet){
	
    var Player = IEntity.EntityInterface(playerMdl.playerParams);
	
	//not sure what this is
	var super_update = this.update;

	
	Player.prototype.update = function(){
		this.updateSpd();
		super_update();
		
		if(this.pressingAttack){
			this.shootBullet(this.mouseAngle);
		}
	};
	
	//this need to change.
	Player.prototype.shootBullet = function(angle){
		Bullet({
            parent	: bulletMdl.playerParams.id,
            angle	: bulletMdl.bulletParams.angle,
            x		: bulletMdl.playerParams.x,
		    y		: bulletMdl.playerParams.y,
            map		: bulletMdl.playerParams.map,
        });
	};
	
	Player.prototype.updateSpd = function(){

		if (playerMdl.playerParams.pressingRight)
			playerMdl.playerParams.spdX = playerMdl.playerParams.maxSpd;
		else if (playerMdl.playerParams.pressingLeft)
			playerMdl.playerParams.spdX = -playerMdl.playerParams.maxSpd;
		else
			playerMdl.playerParams.spdX = 0;
		
		if (playerMdl.playerParams.pressingUp)
			playerMdl.playerParams.spdY = -playerMdl.playerParams.maxSpd;
		else if (playerMdl.playerParams.pressingDown)
			playerMdl.playerParams.spdY = playerMdl.playerParams.maxSpd;
		else
			playerMdl.playerParams.spdY = 0;		
	};
    
    Player.prototype.getInitPack = function(){
        return {
            id		: playerMdl.playerParams.id,
		    x 		: playerMdl.playerParams.x,
		    y 		: playerMdl.playerParams.y,	
		    number 	: playerMdl.playerParams.number,	 
            hp 		: playerMdl.playerParams.hp,
            hpMax 	: playerMdl.playerParams.hpMax,  
            score 	: playerMdl.playerParams.score, 
            map 	: playerMdl.playerParams.map,
        };
    };

    Player.prototype.getUpdatePack = function(){
        return {
            id 	  : playerMdl.playerParams.id,
		    x 	  : playerMdl.playerParams.x,
		    y	  : playerMdl.playerParams.y,	
            score : playerMdl.playerParams.score,  
            hp 	  : playerMdl.playerParams.hp,  
        };
    };
   
	this.list[Player.id] = this;
	
	initPack.player.push(this.getInitPack());
    
	return {Player : Player};

})(entityInterface, PlayerModel, BulletModel, BulletComponent);