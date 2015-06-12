Meteor.publish('armExercises', function(){
	return ArmExercises.find()
});

if (Meteor.isServer){
    console.log("Hello Server");

    Meteor.methods({
        'addArmExerciseToDB': function(exercise, sets, reps){
            ArmExercises.insert({
                name: exercise, 
                sets: sets,
                reps: reps
            });
        }
    })
}
