
checkedExercises = [];

function initalizeCheckList() {
	console.log("worked");
	checkedExercises = [];
	var thisRoutine = Session.get('forCompletedRoutine');
	if(thisRoutine != null) {
	checkedExercises = thisRoutine.exercises.slice(0);
	checkedExercises.forEach(function(obj) {
		obj.checked = false;
	});
}
};
	
Template.routineExercises.helpers({
	// timer : function() { return startTime;},
})

Template.routineExercises.events({
	'click #beginExercise' :function () {
		console.log("hello")
		startTime = (new Date()).getTime();
		initalizeCheckList();
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






