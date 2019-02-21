const socket=io('/my-namespace');


socket.on('connect',()=>{
    console.log("Connected");
    socketId=socket.id
    
})

socket.on('createMessage',(received_message)=>{
    let li=jQuery('<li></li>');
    li.text(`${received_message}`);
    jQuery('#outMsg').append(li)
})

$('#chat_form').submit(function(e){
    e.preventDefault();
    let message=$('#message').val();
    //console.log(message);
    socket.emit('newMessage',message)
    $('#message').val('');
    
    
})

const socket1=io('/movies')
socket1.on('connect',()=>{
    console.log("Connected");
    
})
socket1.on('createMessage',(received_message)=>{
    let li=jQuery('<li></li>');
    li.text(`${received_message}`);
    jQuery('#outMsg1').append(li)
})


$('#chat_form1').submit(function(e){
    e.preventDefault();
    let message=$('#message1').val();
    console.log(message);
    socket1.emit('newMessage',message)
    $('#message1').val('');
    
    
})
