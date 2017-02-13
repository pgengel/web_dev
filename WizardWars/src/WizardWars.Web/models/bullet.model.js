var BulletModel = (function(entityMdl) {

    var bulletParams = {
        
        x        : entityMdl.params.x,
        y        : entityMdl.params.y,
        spdX     : entityMdl.params.spdX,
        spdY     : entityMdl.params.spdY,
        id       : entityMdl.params.id,
        map      : entityMdl.params.map,

        angle    : entityMdl.params.angle,
        spdX     : Math.cos(entityMdl.params.angle/180*Math.PI) * 10,
        spdY     : Math.sin(entityMdl.params.angle/180*Math.PI) * 10,
        parent   : entityMdl.params.parent,
        timer    : 0,
        toRemove : false,
    },

    return {bulletParams : bulletParams}

})(EntityModel),