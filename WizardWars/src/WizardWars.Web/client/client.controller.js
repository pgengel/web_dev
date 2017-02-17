// Client side - This will send data from the client to the server
var clientController = (function(){

        // import the socket emit and on listners.
        var clientSocket = io();

        var setupEventListeners = function() {
                
            // The client presses a key
            document.onkeydown = function(event){
                if(event.keyCode === 68)
                    clientSocket.emit('keyPress', {inputId : 'right', state : true});   
                else if(event.keyCode === 83)	//s
                    clientSocket.emit('keyPress', {inputId : 'down', state : true});
                else if(event.keyCode === 65) //a
                    clientSocket.emit('keyPress', {inputId : 'left', state : true});
                else if(event.keyCode === 87) // w
                    clientSocket.emit('keyPress', {inputId : 'up', state : true});
                    
            };

            // The client presses a key
            document.onkeyup = function(event){
                if(event.keyCode === 68)	//d
                    clientSocket.emit('keyPress', {inputId : 'right', state : false});
                else if(event.keyCode === 83)	//s
                    clientSocket.emit('keyPress', {inputId : 'down', state : false});
                else if(event.keyCode === 65) //a
                    clientSocket.emit('keyPress', {inputId : 'left', state : false});
                else if(event.keyCode === 87) // w
                    clientSocket.emit('keyPress', {inputId : 'up', state : false});
            };

            // The client presses the mouse down.           
            document.onmousedown = function(event){
                clientSocket.emit('keyPress', {inputId : 'attack', state : true});
            };

            // The client presses a mouse up.
            document.onmouseup = function(event){            
                clientSocket.emit('keyPress', {inputId : 'attack', state : false});
            };

            // The client moves the mouse. 
            document.onmousemove = function(event){            
                var x = -250 + event.clientX - 8;
                var y = -250 + event.clientY - 8;
                var angle = Math.atan2( y, x) / Math.PI * 180;
                clientSocket.emit('keyPress', {inputId : 'mouseAngle', state : angle});
            };  
        };

        var drawNewPosition = function() {
            var ctx = document.getElementById('ctx').getContext("2d");
            ctx.font = '30px Arial';

            clientSocket.on('newPosition', function(data) {

                ctx.clearRect(0, 0, 500, 500);
                //draw the player
                for(var i = 0; i< data.player.length; i++){
                    ctx.fillText(data.player[i].number, data.player[i].x, data.player[i].y);
                }

                //draw the bullets
                for(var i = 0; i< data.bullet.length; i++){
                    ctx.fillRect(data.bullet[i].x-5, data.bullet[i].y-5, 10, 10);
                }
               
            });
        };

        var init = function() {
            console.log('Apllication has started.');

            // Load JQuery.
            $("document").ready(function() {});

            // TODO: Reset the game once refreshed.
            var WIDTH = 500;
            var HEIGHT = 500;


            var initPack = {player:[],bullet:[]};
            var removePack = {player:[],bullet:[]};
                        
            // Init the event listerners.
            setupEventListeners();  

            drawNewPosition();
  
        };

        return {init : init}
})();