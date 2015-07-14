
	
Template.editRoutine.events({ 
	'submit #addToRoutine':function (event) {
		event.preventDefault();
		var name = event.target.routineName.value;
		console.log(name);
		// var justCreated;
		Meteor.call('editRoutine', name, function(error, result){
			Session.set('recentAdd', result);
   			console.log(Routines.findOne({_id: result}));
		});
		event.target.routineName.value = "";
	},

	'click .select' : function() {
		var selectedRoutine = this;
		console.log(selectedRoutine);
		Session.set('selectedRoutine', selectedRoutine);
	}
})

Template.editRoutine.helpers({
	exercises: function() {return Exercises.find({},{}).fetch()},  //Gotta change later so that it consist only of presets and user inserted routines
})




