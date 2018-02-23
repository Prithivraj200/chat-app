var generateMsg = (from,text) =>{
	return {
		from,
		text,
		completedAt:new Date().getTime()
	}
}

module.exports={generateMsg}