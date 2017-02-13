

        
        var Player = function(initPack){
            var self = {};
            self.id = initPack.id;
            self.number = initPack.number;
            self.x = initPack.x;
            self.y = initPack.y;
            self.hp = initPack.hp;
            self.score = initPack.score;
            self.hpMax = initPack.hpMax;
            self.map = initPack.map;
            
            self.draw = function(){
                if(Player.list[selfId].map !== self.map)
                    return;
                var x = self.x - Player.list[selfId].x + WIDTH/2;
                var y = self.y - Player.list[selfId].y + HEIGHT/2;
                
                var hpWidth = 30 * self.hp / self.hpMax;
                ctx.fillStyle = 'red';
                ctx.fillRect(x - hpWidth/2, y - 40, hpWidth, 4);
                
                var width = Img.player.width * 2;
                var height = Img.player.height * 2;
                
                ctx.drawImage(Img.player,
                    0,0,Img.player.width,Img.player.height,
                    x-width/2,y-height/2,width,height);            
                
                // ctx.fillText(self.number,self.x,self.y);
                // ctx.fillText(self.score,self.x,self.y - 60);     
            }
            Player.list[self.id] = self;
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
                
                var x = self.x - Player.list[selfId].x + WIDTH/2;
                var y = self.y - Player.list[selfId].y + HEIGHT/2;
                
                ctx.drawImage(Img.bullet,
                    0,0,Img.bullet.width,Img.bullet.height,
                    x-width/2,y-height/2,width,height);   
            }
            Bullet.list[self.id] = self;		
            return self;
        }
        Bullet.list = {};
        
        var selfId = null;
        
        socket.on('init',function(data){	
            //{ player : [{id:123,number:'1',x:0,y:0},{id:1,number:'2',x:0,y:0}], bullet: []}
            if(data.selfId)
                selfId = data.selfId;
            for(var i = 0 ; i < data.player.length; i++){
                new Player(data.player[i]);
            }
            for(var i = 0 ; i < data.bullet.length; i++){
                new Bullet(data.bullet[i]);
            }
        });
        
        socket.on('update',function(data){ //decopression needs to be handle here.
            //{ player : [{id:123,x:0,y:0},{id:1,x:0,y:0}], bullet: []}
            for(var i = 0 ; i < data.player.length; i++){
                var pack = data.player[i];
                var p = Player.list[pack.id];
                if(p){
                    if(pack.x !== undefined)
                        p.x = pack.x;
                    if(pack.y !== undefined)
                        p.y = pack.y;
                    if(pack.hp !== undefined)
                        p.hp = pack.hp;
                    if(pack.score !== undefined)
                        p.score = pack.score;
                }
            }
            for(var i = 0 ; i < data.bullet.length; i++){
                var pack = data.bullet[i];
                var b = Bullet.list[data.bullet[i].id];
                if(b){
                    if(pack.x !== undefined)
                        b.x = pack.x;
                    if(pack.y !== undefined)
                        b.y = pack.y;
                }
            }
        });
        
        socket.on('remove',function(data){
            //{player:[12323],bullet:[12323,123123]}
            for(var i = 0 ; i < data.player.length; i++){
                delete Player.list[data.player[i]];
            }
            for(var i = 0 ; i < data.bullet.length; i++){
                delete Bullet.list[data.bullet[i]];
            }
        });
        
        setInterval(function(){
            if(!selfId)
                return;
            ctx.clearRect(0,0,500,500);
            drawMap();
            drawScore();
            for(var i in Player.list)
                Player.list[i].draw();
            for(var i in Bullet.list)
                Bullet.list[i].draw();
        },40);
        
        var drawMap = function(){
            var player = Player.list[selfId];
            var x = WIDTH/2 - player.x;
            var y = HEIGHT/2 - player.y;
            ctx.drawImage(Img.map[player.map],x,y);
        }
        
        var drawScore = function(){
            ctx.fillStyle = 'white';
            ctx.fillText(Player.list[selfId].score, 0, 30);
        }