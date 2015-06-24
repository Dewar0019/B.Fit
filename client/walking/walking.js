if(Meteor.isClient){

	Template.walking.helpers({

		'walkingCardio': function(){
			return WalkingCardio.find({}, {sort: { workoutTime: -1}});
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
      		return WalkingCardio.findOne(selectedExer)
    	}

	});

	Template.walking.events({
    
		'submit #addWalkingCardio': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var walkingTime = event.target.walkingTime.value;
			var walkingDistance = event.target.walkingDistance.value;
			Meteor.call('addWalkingCardioToDB', parseInt(walkingTime), parseInt(walkingDistance));
		},

    'click .timep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      WalkingCardio.update(selectedTime, {$inc: {workoutTime: 1}}); 
     },

    'click .timed': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      WalkingCardio.update(selectedTime, {$inc: {workoutTime: -1}});
      },
      
    'click .distancep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      WalkingCardio.update(selectedDistance, {$inc: {Distance: 1}});
      },
      
    'click .distanced': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      WalkingCardio.update(selectedDistance, {$inc: {Distance: -1}});
      },
      'click .remove': function(){
        var playerId = this._id;
        Session.set('selectedInfo',playerId);
        var selectedInfo = Session.get('selectedInfo');
        WalkingCardio.remove(selectedInfo);
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