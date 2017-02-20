var ChatComponent = (function() {
    
    //chat
    //var chatText = $('#chat-text').val();
    //var chatInput = $('#chat-input').val();
    //var chatForm = $('#chat-form').val();
    var chatText = document.getElementById('chat-text');
    var chatInput = document.getElementById('chat-input');
    var chatForm = document.getElementById('chat-form');

    addToChat = function() {
        socket.on('addToChat',function(data){
            chatText.innerHTML += '<div>' + data + '</div>';
        });
    };

    var evalAnswer = function() {
        socket.on('evalAnswer',function(data){
            console.log(data);
        });
    }; 

    var onSubmit = function() {
        chatForm.onsubmit = function(event){
            event.preventDefault();
            if(chatInput.value[0] === '/')
                socket.emit('evalServer', chatInput.value.slice(1));
            else
                socket.emit('sendMessageToServer', chatInput.value);
            chatInput.value = '';		
        } 
    };
 
    return {addToChat  : addToChat, 
            evalAnswer : evalAnswer, 
            onSubmit   : onSubmit}
})();
