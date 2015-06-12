Meteor.publish('armExercises', function(){return ArmExercises.find();});
Meteor.publish('chestExercises', function(){return chestExercises.find();});

if (Meteor.isServer){
    console.log("Hello Server");

    Meteor.methods({
        'addArmExerciseToDB': function(exercise, sets, reps, weight){
            ArmExercises.insert({
                armName: exercise, 
                armSets: sets,
                armReps: reps,
                armWeight: weight
            });
        },

        'addChestExerciseToDB': function(chestExercise, chestSets, chestReps, chestWeight){
            ChestExercises.insert({
                chestName: chestExercise, 
                chestSets: chestSets,
                chestReps: chestReps,
                chestWeight: chestWeight
            });
        }
    })
}
