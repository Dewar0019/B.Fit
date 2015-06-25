Template.profileSavedExercises.helpers({
	returnSelected : function() {
		var getSelected = Session.get("selectedRoutine");
		console.log(getSelected);
		if(getSelected !== undefined) {
			return getSelected.exercises;
		}
	},

	photo : function(){ // returns the URL of the gravatar photo for this email
		return Gravatar.imageUrl(Gravatar.hash(this.emails[0].address,{secure:true}))
	}
})

Template.profileSavedExercises.events({
	'click .showRoutine': function() {
		var getRoutines = this;
		Session.set("selectedRoutine", getRoutines);
		$(".routineList").html(getRoutines.routineName);

	},
		'submit #createNewRoutine': function() {
		event.preventDefault();
		var name = event.target.exercise.value
            Meteor.call('createNewRoutine', name)
		event.target.exercise.value = "";
	},

	'click .removeExercise': function() {
		var selectedEdit = this;
		var selectedRoutine = Session.get("selectedRoutine");
		Routines.update({ _id : selectedRoutine._id}, {$pull: { "exercises": selectedEdit}});
		console.log("remove");
	}
})