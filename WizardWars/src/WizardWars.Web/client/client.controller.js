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

        var playerMove = function() {
            var ctx = document.getElementById('ctx').getContext("2d");
            ctx.font = '30px Arial';

            clientSocket.on('newPosition', function(data) {
                console.log('newPosition');
                ctx.clearRect(0, 0, 500, 500);
                for(var i = 0; i< data.length; i++){
                    ctx.fillText(data[i].number, data[i].x, data[i].y);
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

            playerMove();
  
        };

        return {init : init}
})();