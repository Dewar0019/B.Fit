Template.profileSavedExercises.helpers({
	'getRoutines': function() {return Meteor.user().savedExercises;}
})

Template.profileSavedExercises.events({
	'click .removeExercise': function() {
		var exercise = this;
		console.log(exercise);
		Meteor.call('removeExercise', exercise);
	}
})