if(Meteor.isClient){

	Template.stretching.helpers({

		'stretch': function(){
			return Stretch.find();
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
      		return Stretch.findOne(selectedExer)
    	}

	});

	Template.stretching.events({
    
		'submit #addStretch': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var stretch = event.target.stretch.value;
			var workoutTime = event.target.workoutTime.value;
			Meteor.call('addStretchToDB', stretch, parseInt(workoutTime));
		},

    'click .timep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      Stretch.update(selectedTime, {$inc: {workoutTime: 1}}); 
     },

    'click .timed': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      Stretch.update(selectedTime, {$inc: {workoutTime: -1}});
      }
	});

}