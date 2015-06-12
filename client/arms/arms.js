if(Meteor.isClient){

	Template.arms.helpers({
		'armExercise': function(){
			return ArmExercises.find({}, {sort: {sets: -1}});
		}
	})

	Template.arms.events({
		'submit #addArmExerciseNOW': function(event){
			event.preventDefault();
			console.log("Exercise Added");
			var armExercise = event.target.exercise.value;
			var armSets = event.target.numOfSets.value;
			var armReps = event.target.numOfReps.value;
			var armWeight = event.target.weight.value;
			Meteor.call('addArmExerciseToDB', armExercise, armSets, armReps, armWeight);
		}
	});
}