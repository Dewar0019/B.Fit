Template.exerciseLog.helpers({
	'completedExercise':function(){
		return Completed.find({},{})
	},

	'getDay': function(){
		if (CompletedOn.getDay() == 0) {
			return "Monday"
		} else if (CompletedOn.getDay() == 1){
			return "Tuesday"
		} else if (CompletedOn.getDay() == 2){
			return "Wednesday"
		} else if (CompletedOn.getDay() == 3){
			return "Thursday"
		} else if (CompletedOn.getDay() == 4){
			return "Friday"
		} else if (CompletedOn.getDay() == 5){
			return "Saturday"
		} else if (CompletedOn.getDay() == 6){
			return "Sunday"
		}
	},

	'getMonth': function(){
		return CompletedOn.getMonth()
	}

})

Template.exerciseLog.events({

	'submit #addCompletedExercise': function(event){

		event.preventDefault();
		console.log("Exercise Added");
	
		var name = event.target.nameOfExercise.value;
		var sets = event.target.numOfSets.value;
		var reps = event.target.numOfReps.value;
		var weight = event.target.weight.value;
				
		Completed.insert({
			Name: name, 
			Sets: sets,
			Reps: reps,
			Weight: weight,
			CompletedOn: new Date()
		})
	}
})