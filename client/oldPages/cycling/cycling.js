if(Meteor.isClient){

	Template.cycling.helpers({

		'Exercises': function(){
			return Exercises.find({Category:"cycling"}, {sort: { workoutTime: -1 }});
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

	Template.cycling.events({
	
		'submit #addCyclingCardio': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var cyclingTime = event.target.cyclingTime.value;
			var cyclingSpeed = event.target.cyclingSpeed.value;
			var cyclingDistance = event.target.cyclingDistance.value;

			Exercises.insert({
				Category: "cycling",
                Time: new Date(), 
                workoutTime: cyclingTime, 
                Speed: cyclingSpeed,
                Distance: cyclingDistance
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
		
		'click .speedp': function(){
			var playerId = this._id;
	  		Session.set('selectedExer', playerId);
	  		var selectedSpeed = Session.get('selectedExer');
	  		Exercises.update(selectedSpeed, {$inc: {Speed: 1}});
	  	},
	  
		'click .speedd': function(){
			var playerId = this._id;
	  		Session.set('selectedExer', playerId);
	  		var selectedSpeed = Session.get('selectedExer');
	  		Exercises.update(selectedSpeed, {$inc: {Speed: -1}});
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