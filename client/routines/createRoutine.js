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
})
