
Meteor.publish('armExercises', function(){return ArmExercises.find();});
Meteor.publish('chestExercises', function(){return ChestExercises.find();});
Meteor.publish('legExercises', function(){return LegExercises.find();});
Meteor.publish('coreExercises', function(){return CoreExercises.find();});
Meteor.publish('theProfiles',function(){return Profiles.find();});
Meteor.publish('userExercises', function () { return Meteor.users.find({ _id: this.userId }, { fields: { savedExercises: 1 } });
});

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

        'addCoreExerciseToDB': function(coreExercise, coreSets, coreReps, coreWeight){
            CoreExercises.insert({
                coreName: coreExercise, 
                coreSets: coreSets,
                coreReps: coreReps,
                coreWeight: coreWeight
            });
        },

        'increment': function (sets, reps){
            
        },

        'addRoutine': function(nameOfRoutine) {

        },
    
        'addToRoutine': function(selectedExer) {
            
            if(Meteor.user().savedExercises == null) {
                Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": [selectedExer] } });
            } else {
                var savedExer = Meteor.user().savedExercises;
                console.log(savedExer.push(selectedExer) );
                Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer }});

            }

        }
    })
}
