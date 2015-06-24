if(Meteor.isClient){

	Template.cycling.helpers({

		'cyclingCardio': function(){
			return CyclingCardio.find({}, {sort: { workoutTime: -1 }});
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
      		return CyclingCardio.findOne(selectedExer)
    	}

	});

	Template.cycling.events({
    
		'submit #addCyclingCardio': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var cyclingTime = event.target.cyclingTime.value;
			var cyclingSpeed = event.target.cyclingSpeed.value;
			var cyclingDistance = event.target.cyclingDistance.value;
			Meteor.call('addCyclingCardioToDB', parseInt(cyclingTime), parseInt(cyclingSpeed), parseInt(cyclingDistance));
		},

    'click .timep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      CyclingCardio.update(selectedTime, {$inc: {workoutTime: 1}}); 
     },

    'click .timed': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      CyclingCardio.update(selectedTime, {$inc: {workoutTime: -1}});
      },
      'click .speedp': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      CyclingCardio.update(selectedSpeed, {$inc: {Speed: 1}});
      },
      
    'click .speedd': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      CyclingCardio.update(selectedSpeed, {$inc: {Speed: -1}});
      },

    'click .distancep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      CyclingCardio.update(selectedDistance, {$inc: {Distance: 1}});
      },
      
    'click .distanced': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      CyclingCardio.update(selectedDistance, {$inc: {Distance: -1}});
      },
   'click .remove': function(){
      var playerId = this._id;
      Session.set('selectedInfo',playerId);
      var selectedInfo = Session.get('selectedInfo');
      CyclingCardio.remove(selectedInfo);
    }
	});

}