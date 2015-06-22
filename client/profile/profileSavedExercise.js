Template.profileSavedExercises.helpers({
	returnSelected : function() {
		var getSelected = Session.get("selectedRoutine");
		console.log(getSelected);
		return getSelected.exercises;
	}

})

Template.profileSavedExercises.events({
	'click .showRoutine': function() {
		var getRoutines = this;
		Session.set("selectedRoutine", getRoutines);
	},

	'click .removeExercise': function() {
		var exercise = this;
		console.log(exercise);
		Meteor.call('removeExercise', exercise);
	}
})