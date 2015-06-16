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

    	'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	RunningCardio.update(selectedSet, {$inc: {runningTime: 1}}); 
    	}
      
	});

}