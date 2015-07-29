Template.routineExercises.helpers({
	currentExercise : function() {
		var exerciseBeingPerformed = Session.get("currentExercise");
		console.log("name of current exercise: " + exerciseBeingPerformed.Name);
		return exerciseBeingPerformed
	},
	workoutStarted : function() { return Session.get("workoutStarted");}, //Checks if the workout has started
	anyExerciseLeft: function () { return Session.get("currentExercise") != null;}, //Checks if there are anymore workouts left
})

var Clock = {
	totalSeconds: 0,

	start: function () {
		var self = this;

		this.interval = setInterval(function () {
			self.totalSeconds += 1;

			$("#timer2").text(Math.floor(self.totalSeconds / 3600) + ":"
			+ Math.floor(self.totalSeconds / 60 % 60 / 10) + Math.floor(self.totalSeconds / 60 % 60 % 10) + ":"
			+ parseInt(self.totalSeconds % 60 / 10) + parseInt(self.totalSeconds % 60 % 10));

		}, 1000);
	},

	pause: function () {
		clearInterval(this.interval);
		delete this.interval;
	},

	resume: function () {
		if (!this.interval) this.start();
	},

	stop: function() {
		clearInterval(this.interval);
		delete this.interval;
		totalSeconds = 0;
	}
};


//This checklist will keep track of what exercises has been completed from the routine
checkedExercises = [];
function initalizeCheckList() {
	checkedExercises = [];
	var thisRoutine = Session.get('forCompletedRoutine');
	if(thisRoutine != null) {
		checkedExercises = thisRoutine.exercises.slice(0);  // makes a copy of the exercises page
		checkedExercises.forEach(function(obj) {
			obj.checked = false;					//gives them the property of false which means they are unchecked
		});
	}
};

var running = false;

//When the user has clicked done exercise button upon finishing an exercise moves onto the next
Template.routineExercises.events({
	'click #done' :function() {
		var selectedExercise = Session.get("currentExercise");
		if(selectedExercise == null) {
			confirmFinish();
		} else {
			for(var i = 0; i < checkedExercises.length; i++) {
				if (checkedExercises[i].Name == selectedExercise.Name) {
					if(checkedExercises[i].Sets == selectedExercise.Sets && checkedExercises[i].Reps == selectedExercise.Reps) {
						checkedExercises[i].checked = true;
						Session.set("currentExercise", checkedExercises[i+1]);
						Session.set("voiceNextExercise", checkedExercises[i+2]); // used for the "what's next voice command"
						console.log("done with exercise");
						return;
					}
				}
			}
		}
	},


	//onClick of the begin button the exercise checklist will initalize
	'click .beginExercise' :function () {
		console.log("Exercise Button Clicked")
		console.log($(".beginExercise").html());
		if($(".beginExercise").html() == "Start") {  //Prevent from starting over again
			if (!running) {
				running=true;
				$(".beginExercise").html("Pause");
				$(".beginExercise").attr('id', 'pauseExercise');
				initalizeCheckList();

				Session.set("currentExercise", checkedExercises[0]);
				Session.set("voiceNextExercise", checkedExercises[1]);
				Session.set("workoutStarted", true);
				Session.set("showExerciseList", true); // when the start button is clicked the showExerciseList is set to true
				Clock.start();
				getPietimer();
			}

		} else if($(".beginExercise").html() == "Pause") {
			running=false;
			$(".beginExercise").html("Resume");
			$(".beginExercise").attr('id', 'resumeExercise');
			Clock.pause();
		} else {
			running=true;
			$(".beginExercise").html("Pause");
			$(".beginExercise").attr('id', 'pauseExercise');
			Clock.resume();
		}
	},

	//Prompt the user whether or not they confirm finish workout
	'click [data-action="showConfirm"]': function(event, template) {
		console.log(Clock);
		confirmFinish();
	},
});

//Run this funciton when workout has finished to reset everything
confirmFinish = function() {
	IonPopup.confirm({
		title: 'Your doing great!!',
		template: 'Are you <strong>finished</strong> with your workout?',
		onOk: function() {
			workoutFinish();
		},
		onCancel: function() {
			//Do nothing on cancel because user is still exercising
		},
	});
}




//Resetting all the values so the user can restart their workout
function workoutFinish() {
	toastr.clear(); // Placed in for voice function
	Clock.stop();
	Clock.totalSeconds = 0;
	running = false;
	$(".beginExercise").html("Start");
	$(".beginExercise").attr('id', 'start');
	var routine = Session.get('forCompletedRoutine'); //Grabs the selected routine currently being viewed
	var elementPos = checkedExercises.map(function(x) {return x.checked; }).indexOf(false); //Checks if all the exercises has been completed otherwise grabs the first Index where it has not been
	Completed.insert({
		_uID : Meteor.userId(),
		routineName: routine.routineName,
		exercises: checkedExercises,
		CompletedOn: new Date(),
		completedAll: elementPos == -1, //Want to know if user had completed all exercises
		timeToComplete: Clock.totalSeconds,
	});
	Meteor.call("compileFinished", routine); //Calculates the avg time user did this routine along with number of times fully completed
	Session.set("workoutStarted", false); //Resets to false so can be repeated again
	Router.go('welcome');
	checkedExercises = [];
}

Template.routineExercises.rendered = function() {
	if(Clock.totalSeconds > 0) {
		$(".beginExercise").html("Pause");
		$(".beginExercise").attr('id', 'pauseExercise');
	}
}
