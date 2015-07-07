Template.exerciseLog.helpers({
	'completedExercise':function(){
		today = new Date()
		yesterday = new Date(today.getTime() - 120000)
		// should be 86400000

		return Completed.find( {CompletedOn:{$gt:yesterday} }, {sort: {CompletedOn: -1}} )
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