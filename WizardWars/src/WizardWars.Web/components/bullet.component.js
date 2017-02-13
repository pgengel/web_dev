var BulletComponent = (function(IEntity, BulletMdl, CPlayer){
	
    var Bullet = IEntity.EntityInterface(BulletMdl.bulletParams);

	var super_update = this.update;

    Bullet.prototype.update = function(){
		if(BulletMdl.bulletParams.timer++ > 100)
			BulletMdl.bulletParams.toRemove = true;
		
        super_update();
		
		for(var i in Player.list){
			var p = Player.list[i];
			if(BulletMdl.bulletParams.map === p.map && this.getDistance(p) < 32 && BulletMdl.bulletParams.parent !== p.id){
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
                
                BulletMdl.bulletParams.toRemove = true;
			}
		}
	}
    
    Bullet.prototype.getInitPack = function(){
        return {
            id  : BulletMdl.bulletParams.id,
            x   : BulletMdl.bulletParams.x,
            y   : BulletMdl.bulletParams.y,
            map : BulletMdl.bulletParams.map,
        };
    }
    
    Bullet.prototype.getUpdatePack = function(){
        return {
            id : BulletMdl.bulletParams.id,
            x  : BulletMdl.bulletParams.x,
            y  : BulletMdl.bulletParams.y,
        };
    }
    
	this.list[this.id] = this;
	initPack.bullet.push(this.getInitPack());
	
    return {Bullet : Bullet};

})(entityInterface, BulletModel, PlayerComponent);