Template.exercises.helpers({
	getExercises: function () {return Exercises.find().fetch();},
	returnNotification: function() {return Session.get('successMessage');}
});


Template.exercises.events({
	'click .selectedExercise' : function() {
		var exerciseID = this;
		var routine = Session.get("selectedRoutine");
		Meteor.call('addToRoutine', exerciseID, routine, function(error, result){
			Session.set("selectedRoutine", result);
		});
		Session.set("successMessage", exerciseID.Name + " Added to " + routine.routineName);
	}
})



