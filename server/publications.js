Meteor.publish('armExercises', function(){return ArmExercises.find();});
Meteor.publish('chestExercises', function(){return ChestExercises.find();});
Meteor.publish('legExercises', function(){return LegExercises.find();});
Meteor.publish('coreExercises', function(){return CoreExercises.find();});
Meteor.publish('ellipticalWorkout', function(){return EllipticalWorkout.find();});
Meteor.publish('theProfiles', function(){return Profiles.find();});
Meteor.publish('runningCardio', function(){return RunningCardio.find();});
Meteor.publish('theRoutines', function() {return Routines();}); // PROBLEM ON THIS LINE TAKE A LOOK
Meteor.publish('stairMasterWorkout', function(){return StairMasterWorkout.find();});
Meteor.publish('cyclingCardio', function(){return CyclingCardio.find();});
Meteor.publish('walkingCardio', function(){return WalkingCardio.find();});
Meteor.publish('swimmingWorkout', function(){return SwimmingWorkout.find();});
Meteor.publish('userExercises', function () { return Meteor.users.find({ _id: this.userId }, { fields: { savedExercises: 1 } });});

Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    // can only change your own documents
    if(user._id === userId)
    {
      Meteor.users.update({_id: userId}, modifier);
      return true;
    }
    else return false;
  }
});

// I think this block of code (everything under the if(Meteor.isServer)) should be moved to a different file. 
if (Meteor.isServer){
  console.log("Hello Server");
}