if(Meteor.isClient){

	Template.stretching.helpers({

		'stretch': function(){
			return Exercises.find({Category: "stretching" },{});
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

	Template.stretching.events({
	
		'submit #addExercises': function(event){
			event.preventDefault();
			console.log("Exercise Added");

			var Exercises = event.target.Exercises.value;
			var workoutTime = event.target.workoutTime.value;

			Exercises.insert({
				Category: "stretching",
                Time: new Date(), 
                Name: Exercises, 
                workoutTime: ExercisesTime, 
            });

		},

		'click .timep': function(){
			var playerId = this._id;
			Session.set('selectedExer', playerId);
		  	var selectedTime = Session.get('selectedExer');
		  	Exercises.update(selectedTime, {$inc: {workoutTime: 1}}); 
		},

		'click .timed': function(){
		  	var playerId = this._id;
		  	Session.set('selectedExer', playerId);
		  	var selectedTime = Session.get('selectedExer');
		  	Exercises.update(selectedTime, {$inc: {workoutTime: -1}});
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