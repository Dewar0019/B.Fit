if(Meteor.isClient){

	Template.arms.helpers({
		'armExercise': function(){
			return ArmExercises.find({}, {sort: {sets: -1}});
		},
    	'selectedClass': function (){
      		var playerId = this._id;
      		var selectedExer = Session.get('selectedExer');
      		if(playerId == selectedExer){
        	return "selected"
      		}
     	},
      	'showSelectedExer': function(){
      		var selectedExer = Session.get('selectedExer');
      		return ArmExercises.findOne(selectedExer)
    	}

	});

	Template.arms.events({
		'submit #addExercise': function(event){
			event.preventDefault();
			console.log("Exercise Added");
			var exercise = event.target.exercise.value;
			var sets = event.target.numOfSets.value;
			var reps = event.target.numOfReps.value;
			var weight = event.target.weight.value;
			Meteor.call('addArmExerciseToDB', exercise, sets, reps, weight);
		},
    	'click .armExercise': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId); 
    	},
	    'click .increment': function () {
     	var selectedSet = Session.get('selectedSet');
      	ArmExercises.update(selectedSet, {$inc: {sets: 1}});
    	},
    	'click .decrement': function(){
      	var selectedSet = Session.get('selectedSet');
      	ArmExercises.update(selectedSet, {$inc: {sets: 1}});
    	},

    	'click .incre': function () {
     	var selectedReps = Session.get('selectedReps');
      	ArmExercises.update(selectedReps, {$inc: {reps: 1}});
    	},
    	'click .decre': function(){
      	var selectedReps = Session.get('selectedReps');
      	ArmExercises.update(selectedReps, {$inc: {reps: 1}});
      	}
	});

}