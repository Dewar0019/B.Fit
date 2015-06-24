if(Meteor.isClient){

	Template.chest.helpers({
		'chestExercise': function(){
			return ChestExercises.find({}, {sort:Session.get('chestSort')});
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

      'click #nameUp':function(){
        Session.set('chestSort', {Name: 1});
        //return ArmExercises.find({}, {sort: {armName: 1}});       
      },

      'click #nameDown':function(){
        Session.set('chestSort', {Name: -1});
        //return ArmExercises.find({}, {sort: {armName: -1}});
      },

		'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ChestExercises.update(selectedSet, {$inc: {Sets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ChestExercises.update(selectedReps, {$inc: {Reps: 1}});
    	},

    	'click .setsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ChestExercises.update(selectedSet, {$inc: {Sets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ChestExercises.update(selectedReps, {$inc: {Reps: -1}});
    	},
      'click .remove': function(){
        var playerId = this._id;
        Session.set('selectedInfo',playerId);
        var selectedInfo = Session.get('selectedInfo');
        ChestExercises.remove(selectedInfo);
      },

      'click .addTo' :function() {
        var exercise = this; //selected exercise
        Session.set('goingToAdd', exercise); //store selected exercise
        if(Meteor.userId() == null) {
          alert("Please log in first");
        }
      }
	});
}