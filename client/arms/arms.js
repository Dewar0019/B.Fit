if(Meteor.isClient){

	Template.arms.helpers({

		'armExercise': function(){
			return ArmExercises.find({}, {sort: {armSets: -1}});
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

		'submit #addArmExerciseNOW': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var armExercise = event.target.exercise.value;
			var armSets = event.target.numOfSets.value;
			var armReps = event.target.numOfReps.value;
			var armWeight = event.target.weight.value;
			Meteor.call('addArmExerciseToDB', armExercise, armSets, armReps, armWeight);
		},
    	'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ArmExercises.update(selectedSet, {$inc: {armSets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ArmExercises.update(selectedReps, {$inc: {armReps: 1}});
    	},

    	'click .setsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ArmExercises.update(selectedSet, {$inc: {armSets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ArmExercises.update(selectedReps, {$inc: {armReps: -1}});
    	}
	});

}