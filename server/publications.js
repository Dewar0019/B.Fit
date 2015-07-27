
Meteor.publish('userExercises', function() { return Meteor.users.find({ _id: this.userId }, { fields: { savedExercises: 1 } });});
Meteor.publish('exercises', function() {return Exercises.find();});
Meteor.publish('completed',function() {return Completed.find();});
Meteor.publish('completedCardio', function() {return Cardio.find();});
Meteor.publish('exercisesCardio', function() {return ExercisesCardio.find();});
Meteor.publish('theProfileimages',function(){return ProfileImages.find();});

Meteor.publish("userData", function () {
  if (this.userId) {
	  return Meteor.users.find({_id: this.userId}, {fields: {emails: 1, profile: 1}}); //, //{_id: this.userId},
                             //{fields: {'profile': 1, 'things': 1}});
  } else {
    this.ready();
  }
});