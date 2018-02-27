 var socket=io();

 function scroll(){
 	var msgs=$('#msgs');
 	var newMsg=msgs.children('li:last-child');
 	var scrollH=msgs.prop('scrollHeight');
 	var clientH=msgs.prop('clientHeight');
 	var scrollTop=msgs.prop('scrollTop');
 	var newMsgH=newMsg.innerHeight();
 	var lastMsgH=newMsg.prev().innerHeight();

 	if(clientH + scrollTop + newMsgH + lastMsgH >= scrollH)
 		msgs.scrollTop(scrollH);
 	
 }

 socket.on('connect',function(){
   console.log('Server connected');
 })

 socket.on('disconnect',function(){
   console.log('Server disconnected')
 })

 socket.on('newMessage',function(data){
 	var template=$('#msg-template').html();
 	var li=Mustache.render(template,{
 		from:data.from,
 		time:data.createdAt,
 		msg:data.text
 	})
 	    $('#msgs').append(li);
 	    scroll();
 })

 socket.on('locMessage',function(data){
 	var template=$('#geo-msg-template').html();
 	var li=Mustache.render(template,{
 		from:data.from,
 		time:data.createdAt,
 		url:data.url
 	})
 	    $('#msgs').append(li);
 	    scroll();
 })
 
function submitFunc(){
   socket.emit('createMessage',{
 	  from:'Prethive',
 	  text:$('[name=message]').val()
    },function(msg){
 	   $('[name=message]').val("");
   })
}

var locButton=$('#location');
function geoLocation(){
	if(!navigator.geolocation){
		return alert('Location cannot be fetched! ');
	}
    locButton.attr('disabled','disabled').text('Sending Location...');
	navigator.geolocation.getCurrentPosition(function(position){
		locButton.removeAttr('disabled').text('Send Location');		
        socket.emit('createLocation',{
        	from:'Prethive',
        	coords:{latitude:position.coords.latitude,longitude:position.coords.longitude}
        },function(){

        })
	},function(err){
		locButton.removeAttr('disabled').text('Send Location');
		alert("Unable to fetch Location! ");
	})

}