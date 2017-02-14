//chat
var chatText = $('#chat-text').val();
var chatInput = $('#chat-input').val();
var chatForm = $('#chat-form').val();

socket.on('addToChat',function(data){
    chatText.innerHTML += '<div>' + data + '</div>';
});

socket.on('evalAnswer',function(data){
    console.log(data);
});

chatForm.onsubmit = function(event){
    event.preventDefault();
    if(chatInput.value[0] === '/')
        socket.emit('evalServer', chatInput.value.slice(1));
    else
        socket.emit('sendMsgToServer', chatInput.value);
    chatInput.value = '';		
}  