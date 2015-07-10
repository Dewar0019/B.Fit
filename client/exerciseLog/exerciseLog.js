Template.exerciseLog.helpers({
	'completedExercise':function(){

		// returns everything in the Completed collection that has been added in the past 24 hours. 
		// to change the amount of time change the number below in the unit of milliseconds. 
		
		today = new Date()
		yesterday = new Date(today.getTime() - 86400000)

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

