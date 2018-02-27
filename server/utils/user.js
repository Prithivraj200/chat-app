class Users{
	constructor(){
		this.users=[];
	}

	addUser(id,name,group){
       var user={id,name,group};
       this.users.push(user);
       return user;
	}

	getUser(id){
       var user=this.users.find(u=>u.id == id);
       return user;
	}

	getUserList(group){
       var users=this.users.filter(u=>u.group == group);
       var userNames=users.map(u=>u.name);
           return userNames;
	}

	removeUser(id){
	   var user=this.getUser(id);
       var index=this.users.findIndex(u=>u.id == id);
       if(user)
         this.users.splice(index,1);
       return user;
	}
}


module.exports={
	Users
}