if(Meteor.isClient){

	Template.arms.helpers({

		'armExercise': function(){
			return ArmExercises.find({}, {sort: Session.get('armSort')});
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
      return ArmExercises.findOne(selectedExer);
    	}

	});

	Template.arms.events({

		'submit #addArmExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var armExercise = event.target.exercise.value;
			var armSets = event.target.numOfSets.value;
			var armReps = event.target.numOfReps.value;
			var armWeight = event.target.weight.value;
			Meteor.call('addArmExerciseToDB', armExercise, parseInt(armSets), parseInt(armReps), parseInt(armWeight));
		  },

      'click #nameUp':function(){
        Session.set('armSort', {Name: 1});
        //return ArmExercises.find({}, {sort: {armName: 1}});       
      },

      'click #nameDown':function(){
        Session.set('armSort', {Name: -1});
        //return ArmExercises.find({}, {sort: {armName: -1}});
      },

    	'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ArmExercises.update(selectedSet, {$inc: {Sets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ArmExercises.update(selectedReps, {$inc: {Reps: 1}});
    	},

    	'click .setsd': function(){
    	  var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ArmExercises.update(selectedSet, {$inc: {Sets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ArmExercises.update(selectedReps, {$inc: {Reps: -1}});
    	},

      'click .addTo' :function() {
        var playerId = this._id;
        var tt = ArmExercises.findOne(playerId);
        Meteor.call('addToRoutine', tt);
      }
	});

}