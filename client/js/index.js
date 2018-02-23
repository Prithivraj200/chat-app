 var socket=io();

 socket.on('connect',function(){
   console.log('Server connected');
 })

 socket.on('disconnect',function(){
   console.log('Server disconnected')
 })

 socket.on('newMessage',function(data){
 	console.log('New Message',data);
 })