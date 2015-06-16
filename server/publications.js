
Meteor.publish('armExercises', function(){return ArmExercises.find();});
Meteor.publish('chestExercises', function(){return ChestExercises.find();});
Meteor.publish('legExercises', function(){return LegExercises.find();});
Meteor.publish('coreExercises', function(){return CoreExercises.find();});
Meteor.publish('ellipticalWorkout', function(){return EllipticalWorkout.find();});
Meteor.publish('theProfiles', function(){return Profiles.find();});
Meteor.publish('runningCardio', function(){return RunningCardio.find();});
Meteor.publish('userExercises', function () { return Meteor.users.find({ _id: this.userId }, { fields: { savedExercises: 1 } });
});

// I think this block of code (everything under the if(Meteor.isServer)) should be moved to a different file. 
if (Meteor.isServer){
    console.log("Hello Server");

    Meteor.methods({
        'addArmExerciseToDB': function(armExercise, armSets, armReps, armWeight){
            ArmExercises.insert({
                Name: armExercise, 
                Sets: armSets,
                Reps: armReps,
                Weight: armWeight
            });
        },

        'addChestExerciseToDB': function(chestExercise, chestSets, chestReps, chestWeight){
            ChestExercises.insert({
                Name: chestExercise, 
                Sets: chestSets,
                Reps: chestReps,
                Weight: chestWeight
            });
        },


        'addLegExerciseToDB': function(legExercise, legSets, legReps, legWeight){
            LegExercises.insert({
                Name: legExercise, 
                Sets: legSets,
                Reps: legReps,
                Weight: legWeight
            });
        },

        'addCoreExerciseToDB': function(coreExercise, coreSets, coreReps, coreWeight){
            CoreExercises.insert({
                Name: coreExercise, 
                Sets: coreSets,
                Reps: coreReps,
                Weight: coreWeight
            });
        },

        'addRunningCardioToDB': function(runningTime, runningSpeed, runningDistance){
            RunningCardio.insert({
                runningTime: runningTime,
                runningSpeed: runningSpeed,
                runningDistance: runningDistance
            });
        },

        'increment': function (armSets, armReps){

        },

        'removeExercise': function(exercise) {
            var arr = Meteor.user().savedExercises;
            console.log(arr);
            for(var i = 0; i<arr.length; i++) {
                console.log(arr[i]._id);
                if(arr[i]._id == exercise) {
                    console.log("done");
                    arr.splice(i, 1);
                    return;
                }
            }
        },

        'addRoutine': function(nameOfRoutine) {
            
        },
    
        'addToRoutine': function(selectedExer) {
            if(Meteor.user().savedExercises == null) {
                Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": [newObject]} });
            } else {
                var savedExer = Meteor.user().savedExercises;
                console.log(savedExer.push(newObject) );
                Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer}});
            }

        },

        'addEllipticalWorkoutToDB': function(ellipticalTime , ellipticalSpeed , ellipticalDistance){
            EllipticalWorkout.insert({
                time: new Date(), 
                ellipticalTime: ellipticalTime, 
                ellipticalSpeed: ellipticalSpeed,
                ellipticalDistance: ellipticalDistance
            });
        }
    })
}
