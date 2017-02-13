var appController = (function(){

        var setupEventListeners = function() {
            
            console.log('setupEventListerners');
            
            document.onkeydown = function(event){
                if(event.keyCode === 68)	//d
                    socket.emit('keyPress',{inputId:'right',state:true});
                else if(event.keyCode === 83)	//s
                    socket.emit('keyPress',{inputId:'down',state:true});
                else if(event.keyCode === 65) //a
                    socket.emit('keyPress',{inputId:'left',state:true});
                else if(event.keyCode === 87) // w
                    socket.emit('keyPress',{inputId:'up',state:true});
                    
            }

            document.onkeyup = function(event){
                if(event.keyCode === 68)	//d
                    socket.emit('keyPress',{inputId:'right',state:false});
                else if(event.keyCode === 83)	//s
                    socket.emit('keyPress',{inputId:'down',state:false});
                else if(event.keyCode === 65) //a
                    socket.emit('keyPress',{inputId:'left',state:false});
                else if(event.keyCode === 87) // w
                    socket.emit('keyPress',{inputId:'up',state:false});
            }
            
            document.onmousedown = function(event){
                socket.emit('keyPress',{inputId:'attack',state:true});
            }

            document.onmouseup = function(event){
                socket.emit('keyPress',{inputId:'attack',state:false});
            }

            document.onmousemove = function(event){
                var x = -250 + event.clientX - 8;
                var y = -250 + event.clientY - 8;
                var angle = Math.atan2(y,x) / Math.PI * 180;
                socket.emit('keyPress',{inputId:'mouseAngle',state:angle});
            } 
         
            //chat
            var chatText = document.getElementById('chat-text');
            var chatInput = document.getElementById('chat-input');
            var chatForm = document.getElementById('chat-form');
            
            socket.on('addToChat',function(data){
                chatText.innerHTML += '<div>' + data + '</div>';
            });
            socket.on('evalAnswer',function(data){
                console.log(data);
            });
            
            
            chatForm.onsubmit = function(e){
                e.preventDefault();
                if(chatInput.value[0] === '/')
                    socket.emit('evalServer',chatInput.value.slice(1));
                else
                    socket.emit('sendMsgToServer',chatInput.value);
                chatInput.value = '';		
            }           
        };

        
        setInterval(function(){
            var pack = {
                player:Player.update(),
                bullet:Bullet.update(),
            }
            
            for(var i in SOCKET_LIST){
                var socket = SOCKET_LIST[i];
                socket.emit('init',initPack);
                socket.emit('update',pack);
                socket.emit('remove',removePack);
            }
            initPack.player = [];
            initPack.bullet = [];
            removePack.player = [];
            removePack.bullet = [];
            
        },1000/25);


        var init = function() {
            console.log('Apllication has started.');
            setupEventListeners();    
        };

        return {init : init}
})();