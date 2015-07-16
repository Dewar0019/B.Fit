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
  	}
};


checkedExercises = [];

function initalizeCheckList() {
	console.log("initalizeCheckList function has started");

	var thisRoutine = Session.get('forCompletedRoutine');

	if(thisRoutine != null) {
		checkedExercises = thisRoutine.exercises.slice(0);  // makes a copy of the exercises page
		
		checkedExercises.forEach(function(obj) {
			obj.checked = false;					//gives them the property of false which means they are unchecked
		});
	}

	console.log("initalizeCheckList function has ended");
};
	

Template.routineExercises.helpers({
	showExerciseList : function() {	
		return Session.get("showExerciseList");
	},
	exerciseList: function() {
		return checkedExercises;
	},
	
	currentExercise : function() {
		exerciseBeingPerformed = Session.get("currentExercise");
		console.log("name of current exercise: " + exerciseBeingPerformed.Name);

		return exerciseBeingPerformed
	}
})


var timer_is_on = 0;
var running = false;

Template.routineExercises.events({
	'click #currentWorkout': function() {
		Session.set("showExerciseList", false);
	},

	'click #exerciseList' :function() {
		Session.set("showExerciseList", true);
	},

	'click .beginExercise' :function () {
		console.log("Exercise Button Clicked")
		
		if($(".beginExercise").html() == "Start") {  //Prevent from starting over again
			if (!running) {
				running=true;
				$(".beginExercise").html("Pause");
				$(".beginExercise").attr('id', 'pauseExercise');
				initalizeCheckList();

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

	'click .completionButton' : function() {
		var routine = Session.get('forCompletedRoutine'); //Grabs the selected routine currently being viewed
		// console.log(routine);
		var numbChecked = $('input[name="chk"]:checked').length;
		// console.log(numbChecked);
		// console.log(routine.exercises.length);
		Completed.insert({
			_uID : Meteor.userId(),
			routineName: routine.routineName,
			exercises: checkedExercises,
            completedOn: new Date(),
            completedAll: (routine.exercises.length == numbChecked)
		});
		// checkedExercises = [];
	},

	'click [data-action="showConfirm"]': function(event, template) {
    	IonPopup.confirm({
	      	title: 'Yay you finished!',
	      	template: 'Are you <strong>finished</strong> with your workout?',
	      	
	      	onOk: function() {
	      		Router.go('welcome');
	      	},

			onCancel: function() {
			}

    	});
  	},

	'click .checkbox' : function() {
		console.log("Checkbox was clicked");

		var selectedExercise = this;
			
		var firstUnchecked = checkedExercises.indexOf(selectedExercise)

		if(checkedExercises[firstUnchecked].checked == true) {   //if obj was already checked prior
			checkedExercises[firstUnchecked].checked = false;
		} else {
			checkedExercises[firstUnchecked].checked = true;
			Session.set("currentExercise", checkedExercises[firstUnchecked+1]);
			Session.set("voiceNextExercise", checkedExercises[firstUnchecked+2]); // used for the "what's next voice command"
		}		
	}

});






