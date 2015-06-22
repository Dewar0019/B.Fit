if(Meteor.isClient){

	Template.arms.helpers({



		'armExercise': function(){
			return ArmExercises.find({}, {sort: Session.get('armSort')});
		},

    'showSelectedExer': function(){
      var selectedExer = Session.get('selectedExer');
      return ArmExercises.findOne(selectedExer);
    	}

	});

	Template.arms.events({

		'submit #addArmExercise': function(event){

			event.preventDefault();
			console.log("Exercise Added");

			var armExercise = event.target.exercise.value;
			var armSets = event.target.numOfSets.value;
			var armReps = event.target.numOfReps.value;
			var armWeight = event.target.weight.value;
			Meteor.call('addArmExerciseToDB', armExercise, parseInt(armSets), parseInt(armReps), parseInt(armWeight));
		  },

      'click #nameUp':function(){
        Session.set('armSort', {Name: 1});
        //return ArmExercises.find({}, {sort: {armName: 1}});       
      },

      'click #nameDown':function(){
        Session.set('armSort', {Name: -1});
        //return ArmExercises.find({}, {sort: {armName: -1}});
      },

    	'click .setsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ArmExercises.update(selectedSet, {$inc: {Sets: 1}}); 
    	},

    	'click .repsp': function(){
      	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ArmExercises.update(selectedReps, {$inc: {Reps: 1}});
    	},

    	'click .setsd': function(){
    	  var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedSet = Session.get('selectedExer');
      	ArmExercises.update(selectedSet, {$inc: {Sets: -1}});
    	},
    	
    	'click .repsd': function(){
    	var playerId = this._id;
      	Session.set('selectedExer', playerId);
      	var selectedReps = Session.get('selectedExer');
      	ArmExercises.update(selectedReps, {$inc: {Reps: -1}});
    	},

      'click .addTo' :function() {
        console.log("this is exercise");
        var exercise = this;
        console.log(exercise);
        Session.set('goingToAdd', exercise);
        if(Meteor.userId() == null) {
          alert("Please log in first");
        } 
      },

        'click .selectedRoutine' :function() {
            console.log("this is an array");
            var arr = this;
            console.log(arr);
            var exo = Session.get('goingToAdd');
            exo.createAt = Date();
            var savedExer = Routines.find({_uID: Meteor.userId()}).fetch();
            console.log(savedExer[0][0]);
            for(var i = 0; i<savedExer.length; i++) {
                if(arr[0] == savedExer[i][0]){
                  console.log(savedExer[i].push(exo));
                 Routines.insert( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer}});
                }
            }
          }

          //Keep this code here in case i need to make some changes
          // if(Meteor.user().savedExercises == null) {
          //         Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": [selectedExer]} });
          //     } 
          //     else {
          //         var savedExer = Meteor.user().savedExercises;
          //         console.log(savedExer.push(selectedExer));
          //         Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer}});
          //     }
          // }
        
	});

}