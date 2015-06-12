if(Meteor.isClient){

	Template.arms.helpers({
		'armExercise': function(){
			return ArmExercises.find({}, {sort: {sets: -1}});
		}
	})

	Template.arms.events({
		'submit #addExercise': function(event){
			event.preventDefault();
			console.log("Exercise Added");
			var exercise = event.target.exercise.value;
			var sets = event.target.numOfSets.value;
			var reps = event.target.numOfReps.value;
			var weight = event.target.weight.value;
			Meteor.call('addArmExerciseToDB', exercise, sets, reps, weight);
		}
	});
}