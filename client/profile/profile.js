
Template.profile.helpers({
	profiles :function() { return (this._id == Meteor.userId());},
})
