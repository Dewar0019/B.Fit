Meteor.publish('armExercises', function(){return ArmExercises.find();});
Meteor.publish('chestExercises', function(){return chestExercises.find();});
Meteor.publish('legExercises', function(){return chestExercises.find();});

Meteor.publish("theProfiles",function(){return Profiles.find();});


// I think this block of code (everything under the if(Meteor.isServer)) should be moved to a different file. 
if (Meteor.isServer){
    console.log("Hello Server");

    Meteor.methods({
        'addArmExerciseToDB': function(armExercise, armSets, armReps, armWeight){
            ArmExercises.insert({
                armName: armExercise, 
                armSets: armSets,
                armReps: armReps,
                armWeight: armWeight
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


        'addLegExerciseToDB': function(legExercise, legSets, legReps, legWeight){
            LegExercises.insert({
                legName: legExercise, 
                legSets: legSets,
                legReps: legReps,
                legWeight: legWeight
            });
        },

        'increment': function (armSets, armReps){

        }
    })
}
