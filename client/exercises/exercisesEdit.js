Template.exercisesEdit.events({
	'click #addExercise' : function() {
		var exerciseID = this
		var routine = Session.get("selectedRoutine");
		Meteor.call('addToRoutine', exerciseID, routine, function(error, result){
			Session.set("selectedRoutine", result);
		});
		Session.set("successMessage", exerciseID.Name + " Added to " + routine.routineName);
		console.log(routine._id);
		Router.go("exercises", {_id:routine._id});
	}
})