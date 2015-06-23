
Template.profile.helpers({
	
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
