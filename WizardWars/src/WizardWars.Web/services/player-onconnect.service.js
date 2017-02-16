module.exports = function(serverSocket, PlayerCom) {
    var self = {
        playerOnConnect : function(){
            serverSocket.on('keyPress', function(data){
                if(data.inputId === 'left'){
                    PlayerCom.pressingLeft = data.state;
                }   
                else if(data.inputId === 'right'){
                    PlayerCom.pressingRight = data.state;
                }
                else if(data.inputId === 'up'){
                    PlayerCom.pressingUp = data.state;
                }
                else if(data.inputId === 'down'){
                    PlayerCom.pressingDown = data.state;
                }
                else if(data.inputId === 'attack'){
                    PlayerCom.pressingAttack = data.state;
                }
                else if(data.inputId === 'mouseAngle'){
                    PlayerCom.mouseAngle = data.state;
                }
            })   
        }
    }

    return self;
};