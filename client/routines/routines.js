Template.routines.helpers({
	item: function() {
		return Session.get("grabAllRoutines");
	}, //Gotta change later so that it consist only of presets and user inserted routines

	emptyRoutines : function() {
		return Session.get("grabAllRoutines").length == 0;
	},

	isPreset : function() {
		return this._uID == 'preset';
	},
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
