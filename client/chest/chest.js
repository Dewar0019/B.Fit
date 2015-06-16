if(Meteor.isClient){

	Template.chest.helpers({
		'chestExercise': function(){
			return ChestExercises.find({}, {sort: {chestSets: -1}});
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
			Meteor.call('addChestExerciseToDB', exercise, parseInt(sets), parseInt(reps), parseInt(weight));
		},
		'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ChestExercises.update(selectedSet, {$inc: {chestSets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ChestExercises.update(selectedReps, {$inc: {chestReps: 1}});
    	},

    	'click .setsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ChestExercises.update(selectedSet, {$inc: {chestSets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ChestExercises.update(selectedReps, {$inc: {chestReps: -1}});
    	}
	});
}