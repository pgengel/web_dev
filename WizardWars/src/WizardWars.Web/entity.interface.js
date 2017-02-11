var entityInterface = (function(){

	var EntityInterface = function(param){

			this.x = 250;
			this.y = 250;
			this.spdX = 0;
			this.spdY =0;
			this.id = "";
			this.map ='forest';
		
		if(param){
			if(param.x)
				this.x = param.x;    
			if(param.y)
				this.y = param.y;   
			if(param.map)
				this.map = param.map;   
			if(param.id)
				this.id = param.id;               
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

})();
