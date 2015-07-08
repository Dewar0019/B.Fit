
Template.exercises.helpers({
	getExercises: function () {return Exercises.find().fetch();}
})



Template.exercises.events({
	'click .selectedExercise' : function() {
		var exerciseID = this;
		var routine = Session.get("selectedRoutine");
		Meteor.call('addToRoutine', exerciseID, routine, function(error, result){
			Session.set("selectedRoutine", result);
		});
		alert(exerciseID.Name + " Added to " + routine.routineName);
	}
})