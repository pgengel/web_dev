var EntityModel = require('./entity.model')

var PlayerModel = (function(entityMdl) {

    var playerParams = {
		
		x    : entityMdl.params.x,
        y    : entityMdl.params.y,
        spdX : entityMdl.params.spdX,
        spdY : entityMdl.params.spdY,
        id   : entityMdl.params.id,
        map  : entityMdl.params.map,

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
	},

    return {playerParams : playerParams}

})(EntityModel),