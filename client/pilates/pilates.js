if(Meteor.isClient){

	Template.pilates.helpers({

		'pilatesExercise': function(){
			return Exercises.find({Category : "pilates"}, {sort: Session.get('pilatesSort')});
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
			return Exercises.findOne(selectedExer)
		}

	});

	Template.pilates.events({
	
		'submit #addpilatesExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var pilates = event.target.pilatesName.value;
			var pilatesTime = event.target.pilatesTime.value;
			

			Exercises.insert({ 
				Category: "pilates",
                Name: pilates, 
                workoutTime: pilatesTime, 
            });
	  
		},

		'click #nameUp':function(){
			Session.set('pilatesSort', {Name: 1});
			//return ArmExercises.find({}, {sort: {armName: 1}});       
		},

		'click #nameDown':function(){
		  	Session.set('pilatesSort', {Name: -1});
			//return ArmExercises.find({}, {sort: {armName: -1}});
		},

		'click .timep': function(){
		  	var playerId = this._id;
		  	Session.set('selectedExer', playerId);
		  	var selectedTime = Session.get('selectedExer');
		  	Exercises.update(selectedTime, {$inc: {workoutTime: 1}}); 
		 },

		'click .timed': function(){
		  	var playerId = this._id;
		 	Session.set('selectedExer', playerId);
		  	var selectedTime = Session.get('selectedExer');
			Exercises.update(selectedTime, {$inc: {workoutTime: -1}});
		},
		
		'click .remove': function(){
			var playerId = this._id;
			Session.set('selectedInfo',playerId);
		  	var selectedInfo = Session.get('selectedInfo');
			Exercises.remove(selectedInfo);
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