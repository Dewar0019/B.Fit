
Template.profile.helpers({
	photo:function(){ // returns the URL of the gravatar photo for this email
		return Gravatar.imageUrl(Gravatar.hash(Meteor.user().emails[0].address,{secure:true}))
	}
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
