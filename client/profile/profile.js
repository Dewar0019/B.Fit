
Template.profile.helpers({
	profiles :function() { return (this._id == Meteor.userId());},
})

Template.profile.events({
	'submit #createNewRoutine': function() {
		event.preventDefault();
		var routineName = event.target.exercise.value
		var arr = [routineName];
		console.log(arr);
        if(savedExercises.findOne({}) == null) {
        	savedExercises.insert
            // Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'savedExercises': [arr]} });
        } else {
                var savedExer = Meteor.user().savedExercises;
                console.log(savedExer.push(arr));
                Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer}});
            }      
		event.target.exercise.value = "";
	}
})
