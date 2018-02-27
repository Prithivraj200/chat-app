const moment=require('moment');

var generateMsg = (from,text) =>{
	return {
		from,
		text,
		createdAt:moment().format('h:mm a')
	}
}

var generateLocation=(location)=>{
	return {
		from:location.from,
		url:`https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`,
		createdAt:moment().valueOf().format('h:mm a')
	}
}

module.exports={generateMsg,generateLocation}