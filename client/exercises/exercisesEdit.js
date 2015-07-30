Template.exercisesEdit.events({
	'submit #addExerciseStrength' : function(events) {
		event.preventDefault();
		var exerciseID = this;

		console.log("submit #addExerciseStrength");

		console.log(exerciseID);

		var routine = Session.get("selectedRoutine");
		var sets = event.target.sets.value;
		var reps = event.target.reps.value;
		var weight = event.target.weight.value;

		if(checkThreeValues(sets, reps, weight)) {
			Meteor.call('addToRoutine', exerciseID, routine, sets, reps, weight, function(error, result){
				Session.set("selectedRoutine", result);
			});
			toastr.success(exerciseID.Name + " Added to " + routine.routineName, "Exercise Sucessfully Added");
			console.log(routine._id);
			Router.go("exercises", {_id:routine._id});
		} else {
			alert("You have entered a number less than zero please try again");
		}
	},

	'submit #addExerciseCardio' : function(events) {
		event.preventDefault();
		var exerciseID = Session.get("cardioToAdd");
		console.log("submit #addExerciseCardio");

		console.log(exerciseID);

		var routine = Session.get("selectedRoutine");
		var time = event.target.time.value;
		var distance = event.target.distance.value;


		if(checkTwoValues(time, distance)) {

			Meteor.call('addToCardioRoutine', exerciseID, routine, time, distance, function(error, result) {
				Session.set("selectedRoutine", result);
			});

			toastr.success(exerciseID.Name + " Added to " + routine.routineName, "Exercise Sucessfully Added");
			console.log(routine._id);
			Router.go("exercises", {_id:routine._id});
		} else {
			alert("You have entered a number less than zero please try again");
		}
	},
})

Template.exercisesEdit.helpers({
	isCardio : function() {
		return Session.get("storeExercise");
	},
	'strengthOrCardioForm': function(){
		return Session.get("strengthOrCardio");
	},
})



function checkThreeValues(sets, reps, weight) {
	if(sets <0 || reps < 0 || weight < 0) {
		return false;
	}
	return true;
}

function checkTwoValues(time, distance) {
	if(time <0 || distance < 0) {
		return false;
	}
	return true;
}
