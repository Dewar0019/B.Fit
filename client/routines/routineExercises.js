
// record start time
// var startTime;
// var pauseTime;
// var endTime;
// var timer;
// var t;

// function display() {
//     // later record end time
//     if($(".beginExercise").html() == "Start"){
//     	endTime = new Date();
//     }

//     // time difference in ms
//     var timeDiff = endTime - startTime;

//     // strip the miliseconds
//     timeDiff /= 1000;

//     // get seconds
//     var seconds = Math.round(timeDiff % 60);

//     // remove seconds from the date
//     timeDiff = Math.floor(timeDiff / 60);

//     // get minutes
//     var minutes = Math.round(timeDiff % 60);

//     // remove minutes from the date
//     timeDiff = Math.floor(timeDiff / 60);

//     // get hours
//     var hours = Math.round(timeDiff % 24);

//     // remove hours from the date
//     timeDiff = Math.floor(timeDiff / 24);

//     $("#timer").text(hours + ":" + minutes + ":" + seconds);

//     t = setTimeout(function(){ display() }, 1000);
// }

var Clock = {
	totalSeconds: 0,

	start: function () {
	var self = this;

	this.interval = setInterval(function () {
		self.totalSeconds += 1;

		$("#timer2").text(Math.floor(self.totalSeconds / 3600) + ":" 
			+ Math.floor(self.totalSeconds / 60 % 60 / 10) + Math.floor(self.totalSeconds / 60 % 60 % 10) + ":" 
			+ parseInt(self.totalSeconds % 60 / 10) + parseInt(self.totalSeconds % 60 % 10));

		// $("#hour").text(Math.floor(self.totalSeconds / 3600));
		// $("#mind").text(Math.floor(self.totalSeconds / 60 % 60 / 10));
		// $("#min").text(Math.floor(self.totalSeconds / 60 % 60 % 10));
		// $("#secd").text(parseInt(self.totalSeconds % 60 / 10));
		// $("#sec").text(parseInt(self.totalSeconds % 60 % 10));
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
	console.log("workoutList Clicked");
	checkedExercises = [];
	var thisRoutine = Session.get('forCompletedRoutine');
	if(thisRoutine != null) {
	checkedExercises = thisRoutine.exercises.slice(0);  // makes a copy of the exercises page
	checkedExercises.forEach(function(obj) {
		obj.checked = false;					//gives them the property of false for unchecked
	});
}
};
	

Template.routineExercises.helpers({
	showExerciseList : function() {	return Session.get("showExerciseList");},
	currentExercise : function() {return Session.get("currentExercise");},
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
				// startTime = new Date();
		  //   	setTimeout(display, 1000);
		  		Clock.start();
		    	checkedExercises.forEach(function(obj) {
		    		if(!obj.checked) {
		    		Session.set("currentExercise", obj);
		    		return;
		    		}
		    	});
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
		console.log("in here");
		var selectedExercise = this;
		checkedExercises.forEach(function(obj) {
			console.log(" checkbox loop")
		if (obj.Name == selectedExercise.Name) {
			if(obj.Sets == selectedExercise.Sets && obj.Reps == selectedExercise.Reps) {
					if(obj.checked) {   //if obj was already checked prior
						obj.checked = false;
						console.log("unchecked");
						console.log(obj);
					} else {
						console.log("Checked");
						obj.checked = true;
						console.log(obj);
					}
			}
		}
	});		
	}
});






