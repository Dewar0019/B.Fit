Template.exercises.helpers({
	getExercises: function () {return Exercises.find().fetch();}
})


Template.exercises.events({
	'click .selectedExercise' : function() {
		var exerciseID = this;
		console.log(exerciseID);
		// Meteor.call()
	}
})