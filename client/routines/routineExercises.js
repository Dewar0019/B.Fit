Template.routineExercises.helpers({
	currentExercise : function() {
		exerciseBeingPerformed = Session.get("currentExercise");
		console.log("name of current exercise: " + exerciseBeingPerformed.Name);
		return exerciseBeingPerformed
	},

	workoutStarted : function() {
		return Session.get("workoutStarted");
	}
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
	




var timer_is_on = 0;
var running = false;

Template.routineExercises.events({
	'click #done' :function() {
		var selectedExercise = Session.get("currentExercise");
		if(selectedExercise == null) {
			console.log("finished with workout");
		} else {
		for(var i = 0; i < checkedExercises.length; i++) {
			if (checkedExercises[i].Name == selectedExercise.Name) {
				if(checkedExercises[i].Sets == selectedExercise.Sets && checkedExercises[i].Reps == selectedExercise.Reps) {
					checkedExercises[i].checked = true; 	
					Session.set("currentExercise", checkedExercises[i+1]);
					Session.set("voiceNextExercise", checkedExercises[i+2]); // used for the "what's next voice command"
					console.log("done");
					return;
				}
			}
		  }
		}	
	},


	//onClick of the begin button the exercise checklist will initalize 
	'click .beginExercise' :function () {
		console.log("Exercise Button Clicked")
		if($(".beginExercise").html() == "Start") {  //Prevent from starting over again
			if (!running) {
				running=true;
				$(".beginExercise").html("Pause");
				$(".beginExercise").attr('id', 'pauseExercise');
				initalizeCheckList();

				Session.set("currentExercise", checkedExercises[0]);
				Session.set("workoutStarted", true);
				Session.set("showExerciseList", true); // when the start button is clicked the showExerciseList is set to true

		  		Clock.start();
		    }
	    	
    	} else if($(".beginExercise").html() == "Pause") {
    		running=false;
    		$(".beginExercise").html("Resume");
    		$(".beginExercise").attr('id', 'resumeExercise');
    		// clearTimeout(t);
			// pauseTime = new Date()
			Clock.pause();
    	} else {
    		running=true;
    		$(".beginExercise").html("Pause");
			$(".beginExercise").attr('id', 'pauseExercise');
			Clock.resume();
			// setTimeout(display, 1000);
    	}
	},


//Click completion button for completing exercise
	'click .completionButton' : function() {

	},


//Prompt the user whether or not they confirm finish workout 
	'click [data-action="showConfirm"]': function(event, template) {
		console.log(Clock);
    	IonPopup.confirm({
	      	title: 'Yay you finished!',
	      	template: 'Are you <strong>finished</strong> with your workout?',
	      	onOk: function() {
	
	      	Clock.stop();
			var routine = Session.get('forCompletedRoutine'); //Grabs the selected routine currently being viewed
			var elementPos = checkedExercises.map(function(x) {return x.checked; }).indexOf(false); //Checks if all the exercises has been completed otherwise grabs the first Index where it has not been
			Completed.insert({
				_uID : Meteor.userId(),
				routineName: routine.routineName,
				exercises: checkedExercises,
            	completedOn: new Date(),
            	completedAll: elementPos == -1,
            	timeToComplete: Clock.totalSeconds,
			});
			Meteor.call("compileFinished", routine);
			Session.set("workoutStarted", false);
	      	Router.go('welcome');
	      	},

			onCancel: function() {
			}

    	});
  	},
});







