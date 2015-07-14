Template.exercises.helpers({
	getExercises: function () { return Exercises.find().fetch();},
	startExercise: function() { return Session.get('selectedRoutine').exercises.length > 0},
});




Template.exercises.events({
	'click #startWorkout' : function() {
		var routine = Session.get("selectedRoutine");
		Router.go('routineExercises', {_id: routine._id});
	},

	'click .selectedExercise' : function() {
		var exercise = this;
		console.log(exercise);
		Session.set('storeExercise', exercise);

	}, 
})



