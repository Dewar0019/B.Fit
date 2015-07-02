if(Meteor.isClient){

	Template.core.helpers({

		'coreExercise': function(){
			return Exercises.find({Category:"core"}, {sort: Session.get('coreSort')});
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

	Template.core.events({

		'submit #addCoreExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var coreExercise = event.target.exercise.value;
			var coreSets = event.target.numOfSets.value;
			var coreReps = event.target.numOfReps.value;
			var coreWeight = event.target.weight.value;

			Exercises.insert({
				Category: "core",
				Name: coreExercise, 
				Sets: coreSets,
				Reps: coreReps,
				Weight: coreWeight
			});
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