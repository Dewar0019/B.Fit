if(Meteor.isClient){

	Template.arms.helpers({
		'armExercise': function(){
			return Exercises.find({Category:"arms"}, {sort: Session.get('armSort')});
		},

		'showSelectedExer': function(){
			var selectedExer = Session.get('selectedExer');
			return Exercises.findOne(selectedExer);
			}

	});

	Template.arms.events({

		'submit #addArmExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");
	
			var exercise = event.target.exercise.value;
			var sets = event.target.numOfSets.value;
			var reps = event.target.numOfReps.value;
			var weight = event.target.weight.value;
				
			Exercises.insert({
				Category: "arms",
				Name: exercise, 
				Sets: sets,
				Reps: reps,
				Weight: weight
			})
		},

		'click #nameUp':function(){
			Session.set('armSort', {Name: 1});
			//return Exercises.find({}, {sort: {armName: 1}});       
		},

		'click #nameDown':function(){
			Session.set('armSort', {Name: -1});
			//return Exercises.find({}, {sort: {armName: -1}});
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


		'click .addTo' :function() {
			var exercise = this; //selected exercise
			Session.set('goingToAdd', exercise);
			if(Meteor.userId() == null) {
				alert("Please log in first");
			}
		},

		'click .remove': function(){
			var playerId = this._id;
			Session.set('selectedInfo',playerId);
			var selectedInfo = Session.get('selectedInfo');
			Exercises.remove(selectedInfo);
		}

		 
						// Routines.update( {}, { $set: { 'exercises': getRoutine } });
						// var savedExer = Routines.find({_uID: Meteor.userId()}).fetch();
						// console.log(savedExer[0][0]);
						// for(var i = 0; i<savedExer.length; i++) {
						//     if(arr[0] == savedExer[i]){
									
						//      Routines.insert( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer}});
						//     }
						// }
					

					//Keep this code here in case i need to make some changes
					// if(Meteor.user().savedExercises == null) {
					//         Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": [selectedExer]} });
					//     } 
					//     else {
					//         var savedExer = Meteor.user().savedExercises;
					//         console.log(savedExer.push(selectedExer));
					//         Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer}});
					//     }
					// }
				
	});

}