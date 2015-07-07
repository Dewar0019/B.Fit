Template.createRoutine.events({ 
	'submit #addRoutine':function (event) {
		event.preventDefault();
		var name = event.target.routineName.value;
		console.log(name);
		// var justCreated;
		Meteor.call('createNewRoutine', name, function(error, result){
			Session.set('recentAdd', result);
			console.log("this is the results:  " +result);
   	
		});
		var recentCreated = Session.get('recentAdd');
		console.log("this is the set variable:  " + recentCreated);
		// console.log(Routines.findOne({_id: justCreated}));
		// Router.go('createRoutine', {_id: recentCreated._id});
		event.target.routineName.value = "";
	},
})

// Template.createRoutine.helpers({
// 	grabID : function() {
// 		var recentCreated = Session.get('recentAdd');
// 		console.log(recentCreated._id);
// 		return recentCreated._id;
// 	}
// })