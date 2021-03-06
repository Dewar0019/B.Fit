Template.exerciseLog.rendered = function() {
	Session.set("strenghtOrCardio", true);
	Session.set("viewRoutines", false);
}

Template.exerciseLog.helpers({

	'completedStrengthExercise':function(){
		// returns everything in the Cardio collection that has been added in the past amount of time specified by the users
		fromDate = Session.get("fromDate");
		return Strength.find( {CompletedOn:{$gt:fromDate} }, {sort: {CompletedOn: -1}} )
	},

	'completedExercise':function(){
		// returns everything in the Completed collection that has been added in the past amount of time specified by the users
		setDefaultDate();
		return Completed.find( {CompletedOn:{$gt:fromDate} }, {sort: {CompletedOn: -1}} )
	},

	'completedCardioExercise':function(){
		// returns everything in the Cardio collection that has been added in the past amount of time specified by the users
		fromDate = Session.get("fromDate");
		return Cardio.find( {CompletedOn:{$gt:fromDate} }, {sort: {CompletedOn: -1}} )
	},

	'strenghtOrCardioForm': function(){
		return Session.get("strenghtOrCardio");
	},

	'viewRoutines': function() {
		setDefaultDate();
		return Session.get("viewRoutines");
	}
})

// if the user has never specified to view todays, this week's or this month's exercises, today's is automatically shown
// until the user selects one of the other options.
function todaysDate() {
	today = new Date();
	fromDate = new Date(today.getTime() - 64800000);
	console.log("today was pressed");
	Session.set("fromDate", fromDate);
}


Template.exerciseLog.events({

	'click #viewStrength': function (event){
		Session.set("strenghtOrCardio", true);
		Session.set("viewRoutines", false);

		document.getElementById("viewStrength").className = "tab-item active";
		document.getElementById("viewCardio").className = "tab-item";
		document.getElementById("viewRoutines").className = "tab-item";

	},

	'click #viewCardio': function (event){
		Session.set("strenghtOrCardio", false);
		Session.set("viewRoutines", false);

		document.getElementById("viewStrength").className = "tab-item";
		document.getElementById("viewCardio").className = "tab-item active";
		document.getElementById("viewRoutines").className = "tab-item";
	},

	'click #viewRoutines': function() {
		Session.set("strenghtOrCardio", false);
		Session.set("viewRoutines", true);

		document.getElementById("viewStrength").className = "tab-item";
		document.getElementById("viewCardio").className = "tab-item";
		document.getElementById("viewRoutines").className = "tab-item active";
	},

	'submit #addCompletedExercise': function(event){

		event.preventDefault();
		console.log("Exercise Added");

		var name = event.target.nameOfExercise.value;
		var sets = event.target.numOfSets.value;
		var reps = event.target.numOfReps.value;
		var weight = event.target.weight.value;

		Meteor.call('addToStrengthCollection', name, sets, reps, weight);


		// if the user has never specified to view todays, this week's or this month's exercises, today's is automatically shown
		// until the user selects one of the other options.
		if (Session.get("fromDate") == undefined ){
			today = new Date()
			fromDate = new Date(today.getTime() - 86400000)
			console.log("today was pressed")
			Session.set("fromDate", fromDate);
		}
	},

	'submit #addCardio': function(event){
		event.preventDefault();
		console.log("Exercise Added");

		var name = event.target.cardioName.value;
		var timeTook = event.target.timeTook.value;
		var distance = event.target.distance.value;
		var calories = event.target.calories.value;

		usableDateObj = analyticsDate();

		Cardio.insert({
			_uID: Meteor.userId(),
			Name: name,
			Time: timeTook,
			Distance: distance,
			Calories: calories,
			CompletedOn: new Date(),
			analyticsDate: usableDateObj
		})
	},

	'click #todaysExercises': function (event){

		//1 min 60000
		//good value = 64800000 --> 18 hours

		today = new Date()
		fromDate = new Date(today.getTime() - 64800000)
		console.log("today was pressed")
		Session.set("fromDate", fromDate);

		document.getElementById("todaysExercises").className = "tab-item active";
		document.getElementById("thisWeeksExercises").className = "tab-item";
		document.getElementById("thisMonthsExercises").className = "tab-item";
	},

	'click #thisWeeksExercises': function(event){

		//2 min 120000
		//good value = 604800000

		today = new Date()
		fromDate = new Date(today.getTime() - 604800000)
		console.log("this week was pressed")
		Session.set("fromDate", fromDate);

		document.getElementById("todaysExercises").className = "tab-item";
		document.getElementById("thisWeeksExercises").className = "tab-item active";
		document.getElementById("thisMonthsExercises").className = "tab-item";
	},

	'click #thisMonthsExercises': function(event){

		//3 min 180000
		//good value = 2628000000

		today = new Date()
		fromDate = new Date(today.getTime() - 2628000000)
		console.log("this month was pressed")
		Session.set("fromDate", fromDate);
		document.getElementById("todaysExercises").className = "tab-item";
		document.getElementById("thisWeeksExercises").className = "tab-item";
		document.getElementById("thisMonthsExercises").className = "tab-item active";
	}
})

function setDefaultDate(){
	if(Session.get("fromDate") == undefined) {
		todaysDate();
		fromDate = Session.get("fromDate");
	}
}
