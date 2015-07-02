if(Meteor.isClient){

	Template.legs.helpers({

		'legExercise': function(){
			return Exercises.find({Category:"legs"}, {sort: Session.get('legSort')});
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
			return Exercises.findOne(selectedExer)
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

			Exercises.insert({
				Category: "legs",
				Name: legExercise, 
				Sets: legSets,
				Reps: legReps,
				Weight: legWeight
			});
		},

		'click #nameUp':function(){
			Session.set('legSort', {Name: 1});
			//return ArmExercises.find({}, {sort: {armName: 1}});       
	  	},

		'click #nameDown':function(){
			Session.set('legSort', {Name: -1});
			//return ArmExercises.find({}, {sort: {armName: -1}});
	  	},

		'click .setsp': function(){
			var playerId = this._id;
			Session.set('selectedExer', playerId);
			var selectedSet = Session.get('selectedExer');
			Exercises.update(selectedSet, {$inc: {Sets: 1}}); 
		},

		'click .repsp': function(){
			var playerId = this._id;
			Session.set('selectedExer', playerId);
			var selectedReps = Session.get('selectedExer');
			Exercises.update(selectedReps, {$inc: {Reps: 1}});
		},

		'click .setsd': function(){
			var playerId = this._id;
			Session.set('selectedExer', playerId);
			var selectedSet = Session.get('selectedExer');
			Exercises.update(selectedSet, {$inc: {Sets: -1}});
		},
		
		'click .repsd': function(){
			var playerId = this._id;
			Session.set('selectedExer', playerId);
			var selectedReps = Session.get('selectedExer');
			Exercises.update(selectedReps, {$inc: {Reps: -1}});
		},
	
	 	'click .remove': function(){
			var playerId = this._id;
			Session.set('selectedInfo',playerId);
			var selectedInfo = Session.get('selectedInfo');
	   		Exercises.remove(selectedInfo);
	  	},

		'click .addTo' :function() {
			var exercise = this; //selected exercise
			Session.set('goingToAdd', exercise);
			if(Meteor.userId() == null) {
		  		alert("Please log in first");
			}
		  }
	});
}