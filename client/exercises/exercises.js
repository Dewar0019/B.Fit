Template.exercises.helpers({
	getExercises: function () { return Exercises.find().fetch();},
	startExercise: function() { return Session.get('selectedRoutine').exercises.length > 0},


	'addorEditForm': function(){
		return Session.get("addOrEdit");
	}
});




Template.exercises.events({
	'click #startWorkout' : function() {
		var routine = Session.get("selectedRoutine");
		Router.go('routineExercises', {_id: routine._id});
	},

	'click .selectedExercise' : function() {
		var exercise = this;
		console.log(exercise);
		Session.set('storeExercise', exercise);

	},

	'click #viewAdd': function (event){
		Session.set("addOrEdit", true);

		document.getElementById("viewAdd").className = "tab-item active";
		document.getElementById("viewEdit").className = "tab-item";
	},

	'click #viewEdit': function (event){
		Session.set("addOrEdit", false);

		document.getElementById("viewAdd").className = "tab-item";
		document.getElementById("viewEdit").className = "tab-item active";
	},

})
