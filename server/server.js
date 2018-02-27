 const path=require('path');
 const express=require('express');
 const http=require('http');
 const socketIO=require('socket.io');
 const {generateMsg,generateLocation}=require('./utils/message');
 const {checkString}=require('./utils/validator');
 const {Users}=require('./utils/user');

 const templatePath=path.join(__dirname,'../client');
 var port=process.env.PORT || 3000;
 var app=express();
 var server=http.createServer(app);
 var io=socketIO(server);
 var user=new Users();

 app.use(express.static(templatePath));

 io.on('connection',(socket)=>{
 	console.log('User connected');
 	socket.on('disconnect',()=>{
 		var u=user.removeUser(socket.id);
 		  if(u){
 		    io.to(u.group).emit('newMessage',generateMsg('Admin',`${u.name} has left`));
 		    io.to(u.group).emit('updateUserList',user.getUserList(u.group));
 		   }
 	})

 	socket.on('join',(data,callback)=>{
 		if((!checkString(data.name)) || (!checkString(data.group))){
 		   return callback('Both fields are required..');
 		} 
 		socket.join(data.group);
        user.removeUser(socket.id);
        user.addUser(socket.id,data.name,data.group);
        io.to(data.group).emit('updateUserList',user.getUserList(data.group));
        socket.emit('newMessage',generateMsg('Admin','Welcome to chat app'));
        socket.broadcast.to(data.group).emit('newMessage',
        	            generateMsg('Admin',`${data.name} has joined ${data.group} group`));
 		callback();
 	})

 	socket.on('createMessage',(data,callback)=>{
 	   var u=user.getUser(socket.id);
 	   if(u && checkString(data.text))
 	      io.to(u.group).emit('newMessage',generateMsg(u.name,data.text));
 	   callback('Message sent !');
    })

    socket.on('createLocation',(location,callback)=>{
 	   var u=user.getUser(socket.id);
 	   location.from=u.name;
 	   if(u)
 	       io.to(u.group).emit('locMessage',generateLocation(location));
 	   callback('Location sent !');
    })

 }) 

 server.listen(port,()=>{
 	console.log(`Server running in ${port}`)
 })
