if(Meteor.isClient){

	Template.yoga.helpers({

		'yogaExercise': function(){
			return YogaFlex.find({}, {sort: Session.get('yogaSort')});
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
      		return YogaFlex.findOne(selectedExer)
    	}

	});

	Template.yoga.events({
    
		'submit #addyogaExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var yoga = event.target.yogaName.value;
			var yogaTime = event.target.yogaTime.value;
			Meteor.call('addYogaToDB', yoga, parseInt(yogaTime));
		},

    'click #nameUp':function(){
      Session.set('yogaSort', {Name: 1});
        //return ArmExercises.find({}, {sort: {armName: 1}});       
    },

    'click #nameDown':function(){
      Session.set('yogaSort', {Name: -1});
        //return ArmExercises.find({}, {sort: {armName: -1}});
    },

    'click .timep': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      YogaFlex.update(selectedTime, {$inc: {workoutTime: 1}}); 
     },

    'click .timed': function(){
      var playerId = this._id;
      Session.set('selectedExer', playerId);
      var selectedTime = Session.get('selectedExer');
      YogaFlex.update(selectedTime, {$inc: {workoutTime: -1}});
      },
   'click .remove': function(){
      var playerId = this._id;
      Session.set('selectedInfo',playerId);
      var selectedInfo = Session.get('selectedInfo');
      ArmExercises.remove(selectedInfo);
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