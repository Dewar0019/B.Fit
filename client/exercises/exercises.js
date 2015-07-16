Template.exercises.helpers({
	getExercises: function () { return Exercises.find().fetch();},
	startExercise: function() { return Session.get('selectedRoutine').exercises.length > 0},
	getCardio: function () { return Cardio.find().fetch();},

	'strengthOrCardioForm': function(){
		return Session.get("strengthOrCardio");
	},

	isCardio : function() { 
		var thisExercise = Session.get("storeExercise");
		return thisExercise.type.indexOf("Cardio") > -1;
	},
});




Template.exercises.events({
	'click #startWorkout' : function() {
		var routine = Session.get("selectedRoutine");
		Router.go('routineExercises', {_id: routine._id});
	},

	'click .selectedExercise' : function() {
		var exercise = this;
		console.log(exercise);
		Session.set('storeExercise', (exercise.Type.indexOf("Cardio") > -1));

	},
	'click .selectedCardio' : function() {
		var cardio = this;
		console.log(cardio);
		Session.set('storeExercise', (cardio.Type.indexOf("Cardio") > 1));

	},

	'click #viewAddStrength': function (event){
		Session.set("strengthOrCardio", true);

		document.getElementById("viewAddStrength").className = "tab-item active";
		// document.getElementById("viewEdit").className = "tab-item";
		document.getElementById("viewAddCardio").className = "tab-item";
	},

	// 'click #viewEdit': function (event){
	// 	Session.set("strengthOrCardio", false);

	// 	document.getElementById("viewAddStrength").className = "tab-item";
	// 	document.getElementById("viewEdit").className = "tab-item active";
	// 	document.getElementById("viewCardio").className = "tab-item";
	// },
	'click #viewAddCardio': function (event){
		Session.set("strengthOrCardio", false);

		document.getElementById("viewAddStrength").className = "tab-item";
		// document.getElementById("viewEdit").className = "tab-item";
		document.getElementById("viewAddCardio").className = "tab-item active";
	},

})
