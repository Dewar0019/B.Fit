if(Meteor.isClient){

	Template.walking.helpers({

		'walkingCardio': function(){
			return Exercises.find({Category:"walking"}, {sort: { workoutTime: -1}});
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

	Template.walking.events({
	
		'submit #addExercises': function(event){
			event.preventDefault();
			console.log("Exercise Added");

			var walkingTime = event.target.walkingTime.value;
			var walkingDistance = event.target.walkingDistance.value;

			Exercises.insert({
				Category:"walking",
				Time: new Date(), 
				workoutTime: walkingTime, 
				Distance: walkingDistance
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
	  		var selectedDistance = Session.get('selectedExer');
	  		Exercises.update(selectedDistance, {$inc: {Distance: 1}});
	  	},
	  
		'click .distanced': function(){
	  		var playerId = this._id;
	 		Session.set('selectedExer', playerId);
	 		var selectedDistance = Session.get('selectedExer');
	  		Exercises.update(selectedDistance, {$inc: {Distance: -1}});
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