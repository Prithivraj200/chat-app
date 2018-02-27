 const path=require('path');
 const express=require('express');
 const http=require('http');
 const socketIO=require('socket.io');
 const {generateMsg,generateLocation}=require(__dirname+'/utils/message');

 //console.log(generateMsg('me','age'));

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

 	socket.on('createMessage',(data,callback)=>{
 	   socket.broadcast.emit('newMessage',generateMsg(data.from,data.text));
 	   callback('Message sent !');
    })

    socket.on('createLocation',(location,callback)=>{
 	   socket.broadcast.emit('locMessage',generateLocation(location));
 	   callback('Location sent !');
    })

    //socket.emit('newMessage',generateMsg('Admin','Welcome to chat app'))

    //socket.broadcast.emit('newMessage',generateMsg('Admin','New user joined chat app'))

 }) 

 app.use(express.static(templatePath));

 server.listen(port,()=>{
 	console.log(`Server running in ${port}`)
 })
