
Template.exercises.helpers({
	getExercises: function () { return Exercises.find().fetch();}, //shows strength exercises
	getCardio: function () { return Cardio.find().fetch();},  //shows cardio exercises
	// 	return Session.get("showExerciseList2");
	// },
	exerciseList2: function() {  //shows exercise list for edit
		currentRoutines = Session.get('selectedRoutine');
		console.log("exerciseList2")
		console.log(Session.get('selectedRoutine'));
		return currentRoutines.exercises;
	},
	
	'strengthOrCardioForm': function(){ //choice between strength and cardio
		return Session.get("strengthOrCardio");
	},
	'editOrNot': function(){ //choice between edit and other
		return Session.get("editOrNot");
	},
});

Template.exercises.events({
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
		Session.set("editOrNot", false);
		Session.set("showExerciseList2", false);

		document.getElementById("viewAddStrength").className = "tab-item active";
		document.getElementById("viewAddCardio").className = "tab-item";
		document.getElementById("viewEdit").className = "tab-item";
	},
	'click #viewEdit': function (event){
		Session.set("editOrNot", true);

		Session.set("showExerciseList2", true);

		document.getElementById("viewAddStrength").className = "tab-item";
		document.getElementById("viewEdit").className = "tab-item active";
		document.getElementById("viewAddCardio").className = "tab-item";
	},
	'click #viewAddCardio': function (event){
		Session.set("strengthOrCardio", false);
		Session.set("editOrNot", false);
		Session.set("showExerciseList2", false);

		document.getElementById("viewAddStrength").className = "tab-item";
		document.getElementById("viewAddCardio").className = "tab-item active";
		document.getElementById("viewEdit").className = "tab-item";
	},

})
