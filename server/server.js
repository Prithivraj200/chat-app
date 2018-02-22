 const path=require('path');
 const express=require('express');

 const templatePath=path.join(__dirname,'../client');
 var app=express();
 var port=process.env.PORT || 3000;

 app.use(express.static(templatePath));

 app.listen(port,()=>{
 	console.log(`Server running in ${port}`)
 })
