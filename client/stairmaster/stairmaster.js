if(Meteor.isClient){

  Template.stairmaster.helpers({

    'stairMasterWorkout': function(){
      return StairMasterWorkout.find({}, {sort: {workoutTime: -1}});
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
          return StairMasterWorkout.findOne(selectedExer)
      }

  });

  Template.stairmaster.events({

    'submit #addStairMasterWorkout': function(event){

      event.preventDefault();
      console.log("Exercise Added");

      var stairMasterTime = event.target.stairMasterTime.value;
      var stairMasterSpeed = event.target.stairMasterSpeed.value;
      var stairMasterDistance = event.target.stairMasterDistance.value;
      Meteor.call('addStairMasterWorkoutToDB', parseInt(stairMasterTime) , parseInt(stairMasterSpeed) , parseInt(stairMasterDistance));
     
      },

    'click .timep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      StairMasterWorkout.update(selectedTime, {$inc: {workoutTime: 1}}); 
     },

    'click .timed': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      StairMasterWorkout.update(selectedTime, {$inc: {workoutTime: -1}});
      },

    'click .speedp': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      StairMasterWorkout.update(selectedSpeed, {$inc: {Speed: 1}});
      },
      
    'click .speedd': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedSpeed = Session.get('selectedExer');
      StairMasterWorkout.update(selectedSpeed, {$inc: {Speed: -1}});
      },

    'click .distancep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      StairMasterWorkout.update(selectedDistance, {$inc: {Distance: 1}});
      },
      
    'click .distanced': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedDistance = Session.get('selectedExer');
      StairMasterWorkout.update(selectedDistance, {$inc: {Distance: -1}});
      },

    'click .addTo' :function() {
      var playerId = this._id;
      var tt = StairMasterWorkout.findOne(playerId);
      console.log(tt);
      Meteor.call('addToRoutine', tt);
      console.log("called");
      },
    'click .remove': function(){
      var playerId = this._id;
      Session.set('selectedInfo',playerId);
      var selectedInfo = Session.get('selectedInfo');
     StairMasterWorkout.remove(selectedInfo);
    }
  });

}