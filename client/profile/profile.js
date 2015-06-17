
Template.profile.helpers({
	profiles :function() { return (this._id == Meteor.userId());},
})

Template.profile.events({
	'submit #createNewRoutine': function() {
		event.preventDefault();
		var routineName = event.target.exercise.value;
		Meteor.call('addRoutine', routineName);
		event.target.exercise.value = "";
	}
})
