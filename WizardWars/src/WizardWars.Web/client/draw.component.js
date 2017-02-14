var DrawComponent = (function() {

    var Player = function(initPack){
        this.id = initPack.id;
        this.number = initPack.number;
        this.x = initPack.x;
        this.y = initPack.y;
        this.hp = initPack.hp;
        this.score = initPack.score;
        this.hpMax = initPack.hpMax;
        this.map = initPack.map;
        
        this.draw = function(){
            if(Player.list[selfId].map !== this.map)
                return;
            var x = this.x - Player.list[selfId].x + WIDTH/2;
            var y = this.y - Player.list[selfId].y + HEIGHT/2;
            
            var hpWidth = 30 * this.hp / this.hpMax;
            ctx.fillStyle = 'red';
            ctx.fillRect(x - hpWidth/2, y - 40, hpWidth, 4);
            
            var width = Img.player.width * 2;
            var height = Img.player.height * 2;
            
            ctx.drawImage(Img.player,
                0,0,Img.player.width,Img.player.height,
                x-width/2,y-height/2,width,height);            
            
            // ctx.fillText(self.number,self.x,self.y);
            // ctx.fillText(self.score,self.x,self.y - 60);     
        };

        Player.list[this.id] = this;
        return self;
    }

    Player.list = {};

        
    var Bullet = function(initPack){
        var self = {};
        self.id = initPack.id;
        self.x = initPack.x;
        self.y = initPack.y;
        self.map = initPack.map;

        self.draw = function(){
            if(Player.list[selfId].map !== self.map)
                return;
            var width = Img.bullet.width/2;
            var height = Img.bullet.height/2;
            
            var x = self.x - Player.list[selfId].x + WIDTH / 2;
            var y = self.y - Player.list[selfId].y + HEIGHT / 2;
            
            ctx.drawImage(Img.bullet,
                          0, 
                          0, 
                          Img.bullet.width,
                          Img.bullet.height, 
                          x-width/2, 
                          y-height/2, 
                          width, 
                          height);   
        }

        Bullet.list[self.id] = self;		
        return self;
    }

    Bullet.list = {};
    
    setInterval(function(){
        if(!selfId)
            return;
        ctx.clearRect(0, 0, 500, 500);
        drawMap();
        drawScore();
        for(var i in Player.list)
            Player.list[i].draw();
        for(var i in Bullet.list)
            Bullet.list[i].draw();
    },40);
    
    var drawMap = function(){
        var player = Player.list[selfId];
        var x = WIDTH / 2 - player.x;
        var y = HEIGHT / 2 - player.y;
        ctx.drawImage(Img.map[player.map],x,y);
    }
    
    var drawScore = function(){
        ctx.fillStyle = 'white';
        ctx.fillText(Player.list[selfId].score, 0, 30);
    }
})();

        
