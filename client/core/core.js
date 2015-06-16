if(Meteor.isClient){

	Template.core.helpers({

		'coreExercise': function(){
			return CoreExercises.find({}, {sort: {coreSets: -1}});
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
      		return CoreExercises.findOne(selectedExer)
    	}

	});

	Template.core.events({

		'submit #addCoreExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var coreExercise = event.target.exercise.value;
			var coreSets = event.target.numOfSets.value;
			var coreReps = event.target.numOfReps.value;
			var coreWeight = event.target.weight.value;
			Meteor.call('addCoreExerciseToDB', coreExercise, parseInt(coreSets), parseInt(coreReps), parseInt(coreWeight));
		},
    	'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	CoreExercises.update(selectedSet, {$inc: {coreSets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	CoreExercises.update(selectedReps, {$inc: {coreReps: 1}});
    	},

    	'click .setsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
        CoreExercises.update(selectedSet, {$inc: {coreSets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	CoreExercises.update(selectedReps, {$inc: {coreReps: -1}});
    	}
	});

}