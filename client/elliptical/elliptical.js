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

	Template.elliptical.events({

		'submit #addEllipticalWorkout': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var ellipticalTime = event.target.ellipticalTime.value;
			var ellipticalSpeed = event.target.ellipticalSpeed.value;
			var ellipticalDistance = event.target.ellipticalDistance.value;
			Meteor.call('addEllipticalWorkoutToDB', ellipticalTime , ellipticalSpeed , ellipticalDistance);
		 
      },

    'click .timep': function(){
      var playerId = this._id;
     	Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      EllipticalWorkout.update(selectedTime, {$inc: {ellipticalTime: 1}}); 
   	 },

    'click .timed': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      EllipticalWorkout.update(selectedTime, {$inc: {ellipticalTime: -1}});
     	},

    'click .speedp': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      EllipticalWorkout.update(selectedSpeed, {$inc: {ellipticalSpeed: 1}});
      },
    	
    'click .speedd': function(){
     	var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      EllipticalWorkout.update(selectedSpeed, {$inc: {ellipticalSpeed: -1}});
     	},

    'click .distancep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      EllipticalWorkout.update(selectedDistance, {$inc: {ellipticalDistance: 1}});
      },
      
    'click .distanced': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      EllipticalWorkout.update(selectedDistance, {$inc: {ellipticalDistance: -1}});
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