Template.exercisesEdit.events({
	'submit #addExercise' : function(events) {
		event.preventDefault();
		var exerciseID = this
		var routine = Session.get("selectedRoutine");
		var sets = event.target.sets.value;
		var reps = event.target.reps.value;
		var weight = event.target.weight.value;
		if(checkValues(sets, reps, weight)) {
			Meteor.call('addToRoutine', exerciseID, routine, sets, reps, weight, function(error, result){
				Session.set("selectedRoutine", result);
			});
			Session.set("successMessage", exerciseID.Name + " Added to " + routine.routineName);
			console.log(routine._id);
			Router.go("exercises", {_id:routine._id});
		} else {
			alert("You have entered a number less than zero please try again");
		}
	}

})



function checkValues(sets, reps, weight) {
	if(sets <0 || reps < 0 || weight < 0) {
		return false;
	}
	return true;
}