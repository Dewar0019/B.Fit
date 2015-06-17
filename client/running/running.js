if(Meteor.isClient){

	Template.running.helpers({

		'runningExercise': function(){
			return RunningCardio.find({}, {sort: {runningSets: -1}});
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
      		return RunningCardio.findOne(selectedExer)
    	}

	});

	Template.running.events({
    
		'submit #addRunningExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var runningTime = event.target.runningTime.value;
			var runningSpeed = event.target.runningSpeed.value;
			var runningDistance = event.target.runningDistance.value;
			Meteor.call('addRunningCardioToDB', parseInt(runningTime), parseInt(runningSpeed), parseInt(runningDistance));
		},

    	'click .timep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      RunningCardio.update(selectedTime, {$inc: {workoutTime: 1}}); 
     },

    'click .timed': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      RunningCardio.update(selectedTime, {$inc: {workoutTime: -1}});
      },
      'click .speedp': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      RunningCardio.update(selectedSpeed, {$inc: {Speed: 1}});
      },
      
    'click .speedd': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      RunningCardio.update(selectedSpeed, {$inc: {Speed: -1}});
      },
      'click .distancep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      RunningCardio.update(selectedDistance, {$inc: {Distance: 1}});
      },
      
    'click .distanced': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      RunningCardio.update(selectedDistance, {$inc: {Distance: -1}});
      }
	});

}