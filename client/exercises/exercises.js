Template.exercises.helpers({
	getExercises: function () {
		sortBy = Session.get("sortBy");

		// something like this --> Exercises.find({}, {}).fetch()[12].Tags[0]

		for (var i = 0; i< Exercises.find().count(); i++){
			if ( Exercises.find({}, {}).fetch()[i].Tags[0] == sortBy ) {
				console.log(Exercises.find({}, {}).fetch()[i])
			}
		}

		return Exercises.find().fetch();

	},

	startExercise: function() {
		return Session.get('selectedRoutine').exercises.length > 0
	}
});




Template.exercises.events({
	'click #startWorkout' : function() {
		var routine = Session.get("selectedRoutine");
		Router.go('routineExercises', {_id: routine._id});
	},

	'click #armExercises': function (event){

		Session.set("sortBy", "Arm");

		document.getElementById("armExercises").className = "tab-item active";
		document.getElementById("chestExercises").className = "tab-item";
		document.getElementById("legExercises").className = "tab-item";
		document.getElementById("backExercises").className = "tab-item";
	},

	'click #chestExercises': function(event){

		Session.set("sortBy", "Chest");

		document.getElementById("armExercises").className = "tab-item";
		document.getElementById("chestExercises").className = "tab-item active";
		document.getElementById("legExercises").className = "tab-item";
		document.getElementById("backExercises").className = "tab-item";


	},

	'click #legExercises': function(event){

		Session.set("sortBy", "Legs");

		document.getElementById("armExercises").className = "tab-item";
		document.getElementById("chestExercises").className = "tab-item";
		document.getElementById("legExercises").className = "tab-item active";
		document.getElementById("backExercises").className = "tab-item";
	},

	'click #backExercises': function(event){

		Session.set("sortBy", "Back");

		document.getElementById("armExercises").className = "tab-item";
		document.getElementById("chestExercises").className = "tab-item";
		document.getElementById("legExercises").className = "tab-item";
		document.getElementById("backExercises").className = "tab-item active";
	}
})



