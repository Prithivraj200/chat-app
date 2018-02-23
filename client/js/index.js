 var socket=io();

 socket.on('connect',function(){
   console.log('Server connected');
 })

 socket.on('disconnect',function(){
   console.log('Server disconnected')
 })

 socket.on('newMessage',function(data){
 	var li=$('<li class="input-msg"></li>');
 	    li.text(`${data.from} : ${data.text}`);
 	    $('#msgs').append(li);
 })
 
function submitFunc(){
   socket.emit('createMessage',{
 	  from:'Prethive',
 	  text:$('[name=message]').val()
    },function(msg){
 	   $('#msg').text(msg);
 	   $('[name=message]').val("");

   })
}