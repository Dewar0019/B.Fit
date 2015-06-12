if(Meteor.isClient){

	Template.chest.helpers({
		'chestExercise': function(){
			return ChestExercises.find({}, {sort: {sets: -1}});
		}
	})

	Template.chest.events({
		'submit #addChestExercise': function(event){
			event.preventDefault();
			console.log("Exercise Added");
			var exercise = event.target.exercise.value;
			var sets = event.target.numOfSets.value;
			var reps = event.target.numOfReps.value;
			var weight = event.target.weight.value;
			Meteor.call('addChestExerciseToDB', exercise, sets, reps, weight);
		}
	});
}