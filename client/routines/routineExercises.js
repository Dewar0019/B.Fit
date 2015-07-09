Template.routineExercises.helpers({
})

var checkedExercises = [];


Template.routineExercises.events({
	'click .completionButton' : function() {
		var routine = Session.get('forCompletedRoutine'); //Grabs the selected routine currently being viewed
		// console.log(routine);
		var numbChecked = $('input[name="chk"]:checked').length;
		// console.log(numbChecked);
		// console.log(routine.exercises.length);
		Completed.insert({
			_uID : Meteor.userId(),
			routineName: routine.routineName,
			exercises: checkedExercises,
            completedOn: new Date(),
            completedAll: (routine.exercises.length == numbChecked)
		});
		checkedExercises = [];
		alert("Congrats on completing your exercise");
		Route.go('welcome');
	},

	'click .checkbox' : function() {
		var selectedExercise = this;
		// console.log(selectedExercise);
		if( $.inArray(selectedExercise, checkedExercises) == -1) { //checks to see if duplicate exercise is within array
			checkedExercises.push(selectedExercise);
		}
		console.log(checkedExercises);
	}
});