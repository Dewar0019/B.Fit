
Template.profiles.helpers({
    getUserName : function() {return Meteor.user().profile.userName },
    getFirstName : function() {return Meteor.user().profile.firstName },
    getLastName : function() {return Meteor.user().profile.lastName },
	profiles :function() { return (this._id == Meteor.userId());},
	bio: function() {}
})

