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

        // THE NEXT TWO METHODS WERE COPIED DIRECTLY FROM THE publicastions.js in case it was needed 
        
        // 'addRoutine': function(nameOfRoutine) {
        // },

        // 'addToRoutine': function(selectedExer) {
        //     if(Meteor.user().savedExercises == null) {
        //         Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": [selectedExer]} });
        //     } else {
        //         var savedExer = Meteor.user().savedExercises;
        //         console.log(savedExer.push(selectedExer));
        //         Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer}});
        //     }


        // },



        //THIS IS A SEPRATE COMMENTED OUT BLOCK. 
        // 'addRoutine': function(nameOfRoutine) {
        //      if(Meteor.user().savedExercises == null) {
        //         Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'savedExercises.': []} });
        //     } 
            // else {
            //     var savedExer = Meteor.user().savedExercises;
            //     console.log(savedExer.push(selectedExer));
            //     Meteor.users.update( { _id: Meteor.userId() }, { $set: { "savedExercises": savedExer}});
            // }
        // },

    // },


        'addEllipticalWorkoutToDB': function(ellipticalTime , ellipticalSpeed , ellipticalDistance){
            EllipticalWorkout.insert({
                time: new Date(), 
                ellipticalTime: ellipticalTime, 
                ellipticalSpeed: ellipticalSpeed,
                ellipticalDistance: ellipticalDistance
            });
        }
    })
