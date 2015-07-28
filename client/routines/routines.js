Template.routines.helpers({
	item: function() {
		return Session.get("grabAllRoutines");
	},

	emptyRoutines: function() {
		return Session.get("grabAllRoutines").length == 0;
	},

	isPreset: function() {
		return this._uID == 'preset';
	},

	determineExerciseType: function() {
		var allRoutines = Session.get("grabAllRoutines");

		for (var routine in allRoutines){
			for (var exercise in exercises){
				if (exercise.ExerciseType == "Strength"){
					Session.set("isStrength", true);
				} else if (exercise.CardioName == "Cardio") {
					Session.set("isStrength", false);
				}
			}
		}
	}


})

Template.routines.rendered = function() {
	Session.set("grabAllRoutines", Routines.find({_uID: Meteor.userId()}).fetch());
}

Template.routines.events({
	'click #setForCompleted' :function() {
		var routine = this;
		Session.set('forCompletedRoutine', routine);
		console.log("routine has been set");
		console.log(routine);
	},

	'click #ownRoutines' : function() {
		Session.set("grabAllRoutines", Routines.find({_uID: Meteor.userId()}).fetch());
		document.getElementById("ownRoutines").className = "tab-item active";
		document.getElementById("presetRoutines").className = "tab-item";

	},

	'click #presetRoutines' : function() {
		Session.set("grabAllRoutines", Routines.find({preset: true}).fetch());
		document.getElementById("presetRoutines").className = "tab-item active";
		document.getElementById("ownRoutines").className = "tab-item";
	},

})
