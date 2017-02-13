var entityInterface = (function(entityMdl){

	var EntityInterface = function(){
	
		if(entityMdl.params){
			if(entityMdl.params.x)
				this.x = entityMdl.params.x;    
			if(entityMdl.params.y)
				this.y = entityMdl.params.y;   
			if(entityMdl.params.map)
				this.map = entityMdl.params.map;   
			if(entityMdl.params.id)
				this.id = entityMdl.params.id;               
		}
		
		this.update = function(){  
			this.updatePosition();
		}
		this.updatePosition = function(){
			this.x += this.spdX;
			this.y += this.spdY;
		}
		this.getDistance = function(pt){
			return Math.sqrt(Math.pow(this.x-pt.x,2) + Math.pow(this.y-pt.y,2));
		}

	};

	return {EntityInterface : EntityInterface};

})(EntityModel);
