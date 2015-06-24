Template.profileSavedExercises.helpers({
	returnSelected : function() {
		var getSelected = Session.get("selectedRoutine");
		return getSelected.exercises;
	}

})

Template.profileSavedExercises.events({
	'click .showRoutine': function() {
		var getRoutines = this;
		Session.set("selectedRoutine", getRoutines);
		$(".routineList").html(getRoutines.routineName);

	},

	// 'click .selectedForEdit': function() {
	// 	// var selectedEdit = this;
	// 	// console.log(selectedEdit);
	// 	Session.set("selectedEdit", selectedEdit)
	// },

	'click .removeExercise': function() {
		var selectedEdit = this;
		var selectedRoutine = Session.get("selectedRoutine");
		Routines.update({ _id : selectedRoutine._id}, {$pull: { "exercises": selectedEdit}});
	}
})