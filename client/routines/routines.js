Template.routines.helpers({
	item: function() {
		return Routines.find({}).fetch()
	} //Gotta change later so that it consist only of presets and user inserted routines
})

Template.routines.events({
	'click #setForCompleted' :function() {
		var routine = this;
		Session.set('forCompletedRoutine', routine);
    	console.log("routine has been set");
    	console.log(routine);
	}
})


    




    