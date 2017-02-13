        //game  
        var Img = {};
        Img.player = new Image();
        Img.player.src = '/client/img/player.png';
        Img.bullet = new Image();
        Img.bullet.src = '/client/img/bullet.png';
        Img.map = {};
        Img.map['field'] = new Image();
        Img.map['field'].src = '/client/img/map.png';
        Img.map['forest'] = new Image();
        Img.map['forest'].src = '/client/img/map.png';
        
        //game
        var ctx = document.getElementById("ctx").getContext("2d");
        ctx.font = '30px Arial';