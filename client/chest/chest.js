if(Meteor.isClient){

	Template.chest.helpers({
		'chestExercise': function(){
			return Exercises.find({Category:"chest"}, {sort:Session.get('chestSort')});
		}
	})

	Template.chest.events({


		'submit #addChestExercise': function(event){
			event.preventDefault();
			console.log("Exercise Added");
			var chestExercise = event.target.exercise.value;
			var chestSets = event.target.numOfSets.value;
			var chestReps = event.target.numOfReps.value;
			var chestWeight = event.target.weight.value;

			Exercises.insert({
				Category: "chest",
                Name: chestExercise, 
                Sets: chestSets,
                Reps: chestReps,
                Weight: chestWeight
            });
			
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
			Session.set('goingToAdd', exercise); //store selected exercise
			if(Meteor.userId() == null) {
				alert("Please log in first");
			}
		}
	});
}