 const path=require('path');
 const express=require('express');
 const http=require('http');
 const socketIO=require('socket.io');

 const templatePath=path.join(__dirname,'../client');
 var port=process.env.PORT || 3000;
 var app=express();
 var server=http.createServer(app);
 var io=socketIO(server);

 io.on('connection',(socket)=>{
 	console.log('User connected');
 	socket.on('disconnect',()=>{
 		console.log('User disconnected');
 	})

 	socket.on('createMessage',(data)=>{
 	   console.log('New Email',data);
    })

    socket.emit('newMessage',{
    	from:'Prethive',
        text:'Welcome to app',
        createdAt:new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{
    	from:'Admin',
        text:'Prethive joined this app',
        createdAt:new Date().getTime()
    })


 })

 app.use(express.static(templatePath));

 server.listen(port,()=>{
 	console.log(`Server running in ${port}`)
 })
