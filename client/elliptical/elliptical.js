if(Meteor.isClient){

	Template.elliptical.helpers({

		'ellipticalWorkout': function(){
			return EllipticalWorkout.find({}, {sort: {ellipticalTime: -1}});
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
      		return ellipticalWorkout.findOne(selectedExer)
    	}

	});

	Template.arms.events({

		'submit #addEllipticalWorkout': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var ellipticalTime = event.target.workoutTime.value;
			var ellipticalSpeed = event.target.workoutSpeed.value;
			var ellipticalDistance = event.target.workoutDistance.value;
			Meteor.call('addEllipticalWorkoutToDB', ellipticalTime , ellipticalSpeed , ellipticalDistance);
		  },
    	'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	// var selectedSet = Session.get('selectedExer');
      	// EllipticalWorkout.update(selectedSet, {$inc: {armSets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	// var selectedReps = Session.get('selectedExer');
      	// EllipticalWorkout.update(selectedReps, {$inc: {armReps: 1}});
    	},

    	'click .setsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	// var selectedSet = Session.get('selectedExer');
      	// EllipticalWorkout.update(selectedSet, {$inc: {armSets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	// var selectedReps = Session.get('selectedExer');
      	// EllipticalWorkout.update(selectedReps, {$inc: {armReps: -1}});
    	},

      'click .addTo' :function() {
        var playerId = this._id;
        var tt = EllipticalWorkout.findOne(playerId);
        console.log(tt);
        Meteor.call('addToRoutine', tt);
        console.log("called");
      }
	});

}