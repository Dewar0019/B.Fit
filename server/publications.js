Meteor.publish('armExercises', function(){return ArmExercises.find();});

Meteor.publish('chestExercises', function(){return chestExercises.find();});

Meteor.publish("theProfiles",function(){return Profiles.find();});

if (Meteor.isServer){
    console.log("Hello Server");

    Meteor.methods({
        'addArmExerciseToDB': function(armExercise, armSets, armReps, armWeight){
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
        },

        'increment': function (armSets, armReps){

        }
    })
}
