Template.exercises.helpers({
<<<<<<< HEAD
=======
	getExercises: function () {return Exercises.find().fetch();},
	returnNotification: function() {return Session.get('successMessage');},
	
});
>>>>>>> dewar

	getExercises: function () {return Exercises.find({},{sort:{category: -1}}).fetch();}
	returnNotification: function() {return Session.get('successMessage');}
})

Template.exercises.events({
	'click .selectedExercise' : function() {
		var exerciseID = this
		var routine = Session.get("selectedRoutine");
		Meteor.call('addToRoutine', exerciseID, routine, function(error, result){
			Session.set("selectedRoutine", result);
		});
		Session.set("successMessage", exerciseID.Name + " Added to " + routine.routineName);
	}
})



