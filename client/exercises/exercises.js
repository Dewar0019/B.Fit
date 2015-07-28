
Template.exercises.helpers({
	getExercises: function () { return Exercises.find().fetch();}, //shows strength exercises
	getCardio: function () { return ExercisesCardio.find().fetch();},  //shows cardio exercises
	showExerciseList2 : function() {
		return Session.get("showExerciseList2");
	},
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
function refresh() {
          window.location.reload(true);
       
     }
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
		console.log("strength")
		document.getElementById("viewAddStrength").className = "tab-item active";
		document.getElementById("viewAddCardio").className = "tab-item";
		document.getElementById("viewEdit").className = "tab-item";
	},
	'click #viewEdit': function (event){
		Session.set("editOrNot", true);

		Session.set("showExerciseList2", true);
		console.log("edit")
		document.getElementById("viewAddStrength").className = "tab-item";
		document.getElementById("viewEdit").className = "tab-item active";
		document.getElementById("viewAddCardio").className = "tab-item";
	},
	'click #viewAddCardio': function (event){
		Session.set("strengthOrCardio", false);
		Session.set("editOrNot", false);
		Session.set("showExerciseList2", false);
		console.log("cardio")
		document.getElementById("viewAddStrength").className = "tab-item";
		document.getElementById("viewAddCardio").className = "tab-item active";
		document.getElementById("viewEdit").className = "tab-item";
	},
	'click #button icon remove': function(){
		console.log("remove clicked1!");
      	var playerId = this._id;
	    Session.set('currentRoutines', playerId);
	        var selected = Session.get('currentRoutines');
	        Exercises.update($selected.remove());
	        console.log("remove clicked2!");
    },

	'click #removeButton': function(){
		console.log("remove button was pressed");
		event.preventDefault();
		var playerId = this._id;
		var routineView = Session.get('selectedRoutine');

		console.log(name);
		var newList = [];
		for (var i=0; i<routineView.exercises.length; i++){
			if(playerId != routineView.exercises[i]._id) {
				newList.push(routineView.exercises[i]);
			}
		}
		Routines.update({_id: routineView._id}, {$set:{exercises:newList}});
		Router.go('createRoutine');
		// refresh();
	}

})


    
