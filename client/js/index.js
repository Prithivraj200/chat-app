 var socket=io();

 socket.on('connect',function(){
   console.log('Server connected');
 })

 socket.on('disconnect',function(){
   console.log('Server disconnected')
 })

 socket.on('newMessage',function(data){
 	var li=$('<li></li>');
 	    li.text(`${data.from} ${data.createdAt}: ${data.text}`);
 	    $('#msgs').append(li);
 })

 socket.on('locMessage',function(data){
 	var li=$('<li></li>');
 	var a=$('<a target="_blank">My Current Location<a>');
 	    li.text(`${data.from} ${data.createdAt}`);
 	    a.attr('href',data.url);
 	    li.append(a);
 	    $('#msgs').append(li);
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