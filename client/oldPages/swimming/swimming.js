if(Meteor.isClient){

  Template.swimming.helpers({

		'swimmingWorkout': function(){
			return Exercises.find({Category: "swimming"}, {sort: { workoutTime: -1 }});
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

	Template.swimming.events({

		'submit #addExercises': function(event){

			event.preventDefault();
		 	console.log("Exercise Added");

			  var swimmingTime = event.target.swimmingTime.value;
			  var swimmingLaps = event.target.swimmingLaps.value;
			  var swimmingDistance = event.target.swimmingLaps.value * 25;

			Exercises.insert({
				Cartegory: "swimming",
				Time: new Date(), 
				workoutTime: swimmingTime, 
				Laps: swimmingLaps,
				Distance: swimmingDistance
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

		'click .distancep': function(){
		  	var playerId = this._id;
		  	Session.set('selectedExer', playerId);
		  	var selectedSpeed = Session.get('selectedExer');
		  	Exercises.update(selectedSpeed, {$inc: {Laps: 1}});
		  	Exercises.update(selectedSpeed, {$inc: {Distance: 25}});
		},

		  
		'click .distanced': function(){
		  	var playerId = this._id;
		  	Session.set('selectedExer', playerId);
		  	var selectedSpeed = Session.get('selectedExer');
		  	Exercises.update(selectedSpeed, {$inc: {Laps: -1}});
		  	Exercises.update(selectedSpeed, {$inc: {Distance: -25}});
		},

		'click .addTo' :function() {
		  	var playerId = this._id;
		  	var tt = Exercises.findOne(playerId);
		  	console.log(tt);
		  	Meteor.call('addToRoutine', tt);
		  	console.log("called");
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