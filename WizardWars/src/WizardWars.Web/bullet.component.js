var BulletComponent = (function(IEntity, param, CPlayer){
	
    var Bullet = IEntity.EntityInterface(param);
	
    Bullet.prototype.id = Math.random();
	Bullet.prototype.angle = param.angle;
    Bullet.prototype.spdX = Math.cos(param.angle/180*Math.PI) * 10;
	Bullet.prototype.spdY = Math.sin(param.angle/180*Math.PI) * 10;
	Bullet.prototype.parent = param.parent;
	Bullet.prototype.timer = 0;
	Bullet.prototype.toRemove = false;
	var super_update = this.update;
	
    Bullet.prototype.update = function(){
		if(this.timer++ > 100)
			this.toRemove = true;
		super_update();
		
		for(var i in Player.list){
			var p = Player.list[i];
			if(this.map === p.map && this.getDistance(p) < 32 && this.parent !== p.id){
				//handle collision. ex: hp--;
                p.hp -= 1;
                
                if(p.hp <= 0){
                    var shooter = Player.list[this.parent];
                    if(shooter)
                        shooter.score += 1;
                    p.hp = p.hpMax;
                    p.x = Math.random() * 500;
                    p.y = Math.random() * 500;
				   
                }
                this.toRemove = true;
			}
		}
	}
    
    Bullet.prototype.getInitPack = function(){
        return {
            id:this.id,
            x:this.x,
            y:this.y,
            map:this.map,
        };
    }
    
    Bullet.prototype.getUpdatePack = function(){
        return {
            id:this.id,
            x:this.x,
            y:this.y,
        };
    }
    
	this.list[this.id] = this;
	initPack.bullet.push(this.getInitPack());
	
    return {Bullet : Bullet};

})(entityInterface, param, PlayerComponent);