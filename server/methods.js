Meteor.methods({
	"compileFinished" :function (routine) {
		var counter = 0;
		var averageTime = 0;
		var allCompleted = Completed.find({_uID: Meteor.userId(), routineName: routine.routineName}).fetch();
		allCompleted.forEach(function(obj) {
			averageTime += obj.timeToComplete;
			counter++;
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

	'updateWeight' : function(weight) {
		if(this.userId) {
		var newProfile = Meteor.users.findOne(Meteor.userId());
		console.log(newProfile.profile.currentWeight);
		newProfile.profile.currentWeight = weight;
		console.log(newProfile.profile.currentWeight);
		Meteor.users.update(Meteor.userId(), {$set: {profile: newProfile.profile}});
		console.log(Meteor.user().profile.currentWeight);
		}
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

	// FOR STRENGTH EXERCISES
	'addToRoutine': function(exercise, getRoutine, sets, reps, weight) {  //this will add new exercise to routine
		var currentTime = new Date(); //Grab the current time
		console.log("in the method.js file 1");
		console.dir(exercise);



		Intermediate.insert({ //This is the actual object that will be added to the routine
			Name: exercise.Name,
			Sets: sets,
			Reps: reps,
			Weight: weight,
			type: [exercise.primary, exercise.secondary],
			AddedOn: currentTime,
			AddedBy: Meteor.userId(),
			ExerciseType: "Strength"
		});

		var justAdded = Intermediate.findOne({AddedOn: currentTime, AddedBy: Meteor.userId()}); //grab the exercise that was just added

		justAdded = determineType(justAdded);

		getRoutine.exercises.push(justAdded); //add exercise onto array of exercises
		Routines.update({_id: getRoutine._id}, {$set: {exercises: getRoutine.exercises}}); //update the routine with the new exercises
		return Routines.findOne({_id: getRoutine._id});
	},

	// FOR CARDIO EXERCISES
	'addToCardioRoutine': function (exercise, getRoutine, time, distance){
		var currentTime = new Date(); //Grab the current time
		console.log("in the method.js file 2");
		console.dir(exercise);
		Intermediate.insert({
			Name: exercise.Name, // use of CardioName instead of Name
			Time: time,
			Distance: distance,
			AddedOn: currentTime,
			AddedBy: Meteor.userId(),
			ExerciseType: "Cardio"
		});

		var justAdded = Intermediate.findOne({AddedOn: currentTime, AddedBy: Meteor.userId()}); //grab the exercise that was just added

		justAdded = determineType(justAdded);

		getRoutine.exercises.push(justAdded); //add exercise onto array of exercises
		Routines.update({_id: getRoutine._id}, {$set: {exercises: getRoutine.exercises}}); //update the routine with the new exercises
		return Routines.findOne({_id: getRoutine._id});
	},

	'addToStrengthCollection': function (name, sets, reps, weight){
		Strength.insert({
			_uID: Meteor.userId(),
			Name: name,
			Sets: sets,
			Reps: reps,
			Weight: weight,
			CompletedOn:  new Date()
		})
	}
})


function determineType(exercise) {
	// var allRoutines = Session.get("grabAllRoutines");
	// for (var routine in allRoutines){
	// 	for (var exercise in routine.exercises){
	console.log("the exercise object will be printed below ")
	console.dir(exercise);

	console.log("Beginning if statements")
	if (exercise.ExerciseType == "Strength"){
		console.log("In Determine Type for Strength, exercise is below");
		console.dir(exercise);

		exercise.ExerciseType = true;
		return exercise;

	} else{
		console.log("In Determine Type for Cardio, exercise is below");
		console.dir(exercise);

		exercise.ExerciseType = false;
		return exercise;
	}
	// 	}
	// }
	console.log("determineType function has run");
}
