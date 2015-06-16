
Template.profile.helpers({
	profiles :function() { return (this._id == Meteor.userId());},
})

Template.profile.events({
	'submit #createNewRoutine': function() {
		
	}
})
