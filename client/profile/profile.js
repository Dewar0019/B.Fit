
Template.profile.helpers({
	profiles :function() { return (this._id == Meteor.userId());},
})

Template.profile.events({
	'submit #createNewRoutine': function() {
		event.preventDefault();
		var name = event.target.exercise.value
              Routines.insert({
			 _uID: Meteor.userId() ,
			 routineName: name,
			 exercises: [],
			 createdAt: new Date(),})
		event.target.exercise.value = "";
	}
})
