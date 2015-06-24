if(Meteor.isClient){

  Template.swimming.helpers({

		'swimmingWorkout': function(){
			return SwimmingWorkout.find({},{sort: { workoutTime: -1 }});
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
      		return swimmingWorkout.findOne(selectedExer)
    	}

  });

  Template.swimming.events({

    'submit #addSwimmingWorkout': function(event){

      event.preventDefault();
      console.log("Exercise Added");

      var swimmingTime = event.target.swimmingTime.value;
      var swimmingLaps = event.target.swimmingLaps.value;
      var swimmingDistance = event.target.swimmingLaps.value * 25;
      Meteor.call('addSwimmingWorkoutToDB', parseInt(swimmingTime) , parseInt(swimmingLaps) , parseInt(swimmingDistance));
      },

    'click .timep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      SwimmingWorkout.update(selectedTime, {$inc: {workoutTime: 1}}); 
     },

    'click .timed': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      SwimmingWorkout.update(selectedTime, {$inc: {workoutTime: -1}});
      },

    'click .distancep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      SwimmingWorkout.update(selectedSpeed, {$inc: {Laps: 1}});
      SwimmingWorkout.update(selectedSpeed, {$inc: {Distance: 25}});
      },

      
    'click .distanced': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      SwimmingWorkout.update(selectedSpeed, {$inc: {Laps: -1}});
      SwimmingWorkout.update(selectedSpeed, {$inc: {Distance: -25}});
     	},

    'click .addTo' :function() {
      var playerId = this._id;
      var tt = SwimmingWorkout.findOne(playerId);
      console.log(tt);
      Meteor.call('addToRoutine', tt);
      console.log("called");
      },
    'click .remove': function(){
        var playerId = this._id;
        Session.set('selectedInfo',playerId);
        var selectedInfo = Session.get('selectedInfo');
        SwimmingWorkout.remove(selectedInfo);
      }
  });

}