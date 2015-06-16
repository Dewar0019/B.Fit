if(Meteor.isClient){

	Template.legs.helpers({

		'legExercise': function(){
			return LegExercises.find({}, {sort: {armSets: -1}});
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
      		return LegExercises.findOne(selectedExer)
    	}

	});

	Template.legs.events({

		'submit #addLegExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var legExercise = event.target.exercise.value;
			var legSets = event.target.numOfSets.value;
			var legReps = event.target.numOfReps.value;
			var legWeight = event.target.weight.value;
			Meteor.call('addLegExerciseToDB', legExercise, legSets, legReps, legWeight);
		},
    	'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	LegExercises.update(selectedSet, {$inc: {legSets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	LegExercises.update(selectedReps, {$inc: {legReps: 1}});
    	},

    	'click .setsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
        LegExercises.update(selectedSet, {$inc: {legSets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	LegExercises.update(selectedReps, {$inc: {legReps: -1}});
    	}
	});

}