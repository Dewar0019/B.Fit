Meteor.methods({
	"compileFinished" :function (routine) {
		var counter = 0;
		var averageTime = 0;
		var allCompleted = Completed.find({_uID: Meteor.userId(), routineName: routine.routineName}).fetch();
		allCompleted.forEach(function(obj) {
			if(obj.completedAll) {
				counter++;
				averageTime += obj.timeToComplete;
				console.log("averageTime");
				console.log(averageTime);
			}
		});
		var avgTotalSeconds = averageTime/allCompleted.length;
		console.log("avgTotalSeconds");
		console.log(avgTotalSeconds);
		var completeTimeAverage = (Math.floor(avgTotalSeconds / 3600) + ":" 
		+ Math.floor(avgTotalSeconds / 60 % 60 / 10) + Math.floor(avgTotalSeconds / 60 % 60 % 10) + ":" 
		+ parseInt(avgTotalSeconds % 60 / 10) + parseInt(avgTotalSeconds % 60 % 10));
		console.log(completeTimeAverage);          
		Routines.update({_id: routine._id}, {$set:{ timesCompleted: counter, avgComplete: completeTimeAverage}}); 
		console.log(routine);
	},

	'createNewRoutine' : function(name) {
		return Routines.insert({
			_uID: Meteor.userId(),
			routineName: name,
			exercises: [],
			createdAt: new Date(),
			timesCompleted: 0,
			avgComplete: "0:00:00",
		},

		function(error, result){
			console.log(error,result);
			if(!error){
				return result;
			} else {
				alert("error");
			}
		});
	},
		
	// var justCreated = Routines.findOne({_uID: Meteor.userId(), routineName: name});           
	// console.log(justCreated);
	// return justCreated;
	// Session.set('recentAdd', Routines.findOne({_uID: Meteor.userId(), routineName: name}));

	'addToRoutine': function(exercise, getRoutine, sets, reps, weight) {  //this will add new exercise to routine
		var currentTime = new Date(); //Grab the current time
		Intermediate.insert({ //This is the actual object that will be added to the routine
			Name: exercise.Name, 
			Sets: sets,
			Reps: reps,
			Weight: weight,
			type: [exercise.primary, exercise.secondary],
			AddedOn: currentTime,
			AddedBy: Meteor.userId()
		});
		
		var justAdded = Intermediate.findOne({AddedOn: currentTime, AddedBy: Meteor.userId()}); //grab the exercise that was just added
		getRoutine.exercises.push(justAdded); //add exercise onto array of exercises
		Routines.update({_id: getRoutine._id}, {$set: {exercises: getRoutine.exercises}}); //update the routine with the new exercises
		return Routines.findOne({_id: getRoutine._id});
	}
})