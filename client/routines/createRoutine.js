Template.createRoutine.events({
	'submit #addRoutine':function (event) {
		event.preventDefault();
		var name = event.target.routineName.value;
		console.log(name);
		// var justCreated;

		Meteor.call('createNewRoutine', name, function(error, result){
			Session.set('recentAdd', result);
			console.log(Routines.findOne({_id: result}));
		});

		event.target.routineName.value = "";
	},

	'click .select' : function() {
		var selectedRoutine = this;
		console.log(selectedRoutine);
		Session.set('selectedRoutine', selectedRoutine);
	}
})

Template.createRoutine.helpers({
	item: function() {
		return Routines.find({_uID: Meteor.userId()}).fetch();
	},  //Gotta change later so that it consist only of presets and user inserted routines
	emptyRoutines : function() {
		return Session.get("grabAllRoutines").length == 0;
	},
	'click #removebutton': function(){
		console.log("remove button was pressed");
		// event.preventDefault();
		// var playerId = this._id;
	 //    // Session.set('currentRoutines', playerId);
		// // var routine = Session.get("selectedRoutine");
		// var routineView = Session.get('selectedRoutine');

		// console.log(name);
		// // Routines.find({_id: routineView._id}).exercises
		// // MAKE SPLICE REMOVE PERMANANTLY
		// for (var i=0; i<routineView.exercises.length; i++){
		// 	var newList = [];
		// 	if(playerId != routineView.exercises[i]._id) {
		// 		newList.push(routineView.exercises[i]);

		// 	}
		// }
		// console.log(newList);
		// Routines.update({_id: routineView._id}, {$set:{exercises:newList}});		
	}
})
