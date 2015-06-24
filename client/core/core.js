if(Meteor.isClient){

	Template.core.helpers({

		'coreExercise': function(){
			return CoreExercises.find({}, {sort: Session.get('coreSort')});
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

      'click #nameUp':function(){
        Session.set('coreSort', {Name: 1});
        //return ArmExercises.find({}, {sort: {armName: 1}});       
      },

      'click #nameDown':function(){
        Session.set('coreSort', {Name: -1});
        //return ArmExercises.find({}, {sort: {armName: -1}});
      },
    	'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	CoreExercises.update(selectedSet, {$inc: {Sets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	CoreExercises.update(selectedReps, {$inc: {Reps: 1}});
    	},

    	'click .setsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
        CoreExercises.update(selectedSet, {$inc: {Sets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	CoreExercises.update(selectedReps, {$inc: {Reps: -1}});
    	},
      'click .remove': function(){
        var playerId = this._id;
        Session.set('selectedInfo',playerId);
        var selectedInfo = Session.get('selectedInfo');
        CoreExercises.remove(selectedInfo);
      }
	});

}