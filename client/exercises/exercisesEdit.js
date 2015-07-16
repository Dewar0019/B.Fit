Template.exercisesEdit.events({
	'submit #addExerciseStrength' : function(events) {
		event.preventDefault();
		var exerciseID = this;
		console.log(exerciseID);
		var routine = Session.get("selectedRoutine");
		var sets = event.target.sets.value;
		var reps = event.target.reps.value;
		var weight = event.target.weight.value;
		if(checkValues(sets, reps, weight)) {
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
		var exerciseID = this
		var routine = Session.get("selectedRoutine");
		var time = event.target.time.value;
		var distance = event.target.distance.value;
		if(checkValues(time, distance)) {
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
})
Template.exercisesEdit.helpers({
	isCardio : function() { 
		return Session.get("storeExercise");
	},
})


toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

function checkValues(sets, reps, weight) {
	if(sets <0 || reps < 0 || weight < 0) {
		return false;
	}
	return true;
}

function checkValues(time, distance) {
	if(time <0 || distance < 0) {
		return false;
	}
	return true;
}