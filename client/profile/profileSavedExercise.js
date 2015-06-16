Template.profileSavedExercises.helpers({
	'getRoutines': function() {return Meteor.user().savedExercises;}
})

Template.profileSavedExercises.events({
	'click .removeExercise': function() {
		var exercise = this;
		Meteor.call('removeExercise', exercise);
	}
})