Template.routines.helpers({
	item: function() {
		return Session.get("grabAllRoutines");
	}, //Gotta change later so that it consist only of presets and user inserted routines

	emptyRoutines : function() {
		return Session.get("grabAllRoutines").length == 0;
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
	},

	'click #presetRoutines' : function() {
		Session.set("grabAllRoutines", Routines.find({_uID: "preset"}).fetch());
	},
})





    




    