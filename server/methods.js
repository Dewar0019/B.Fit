    Meteor.methods({
        'searchButton' : function(input) {
              Search.find({
             input: input
            });
        },
        'addArmExerciseToDB': function(armExercise, armSets, armReps, armWeight){
            ArmExercises.insert({
                Name: armExercise, 
                Sets: armSets,
                Reps: armReps,
                Weight: armWeight
            });
        },

        'createNewRoutine' : function(name) {
              Routines.insert({
             _uID: Meteor.userId() ,
             routineName: name,
             exercises: [],
             createdAt: new Date()
            });
        },

        'createIntermediate': function(exo, getRoutine) {
            var currentTime = new Date(); //Grab the current time
            Intermediate.insert({ //This is the actual object that will be added to the routine
                Name: exo.Name, 
                Sets: exo.Sets,
                Reps: exo.Reps,
                Weight: exo.Weight,
                AddedOn: currentTime,
                AddedBy: Meteor.userId()
            });
             var justAdded = Intermediate.findOne({AddedOn: currentTime}); //grab the exercise that was just added
             getRoutine.exercises.push(justAdded); //add exercise onto array of exercises
            Routines.update({_id: getRoutine._id}, {$set: {exercises: getRoutine.exercises}}); //update the routine with the new exercises

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
                Time: new Date(), 
                workoutTime: runningTime,
                Speed: runningSpeed,
                Distance: runningDistance
            });
        },
         'addStairMasterWorkoutToDB': function(stairMasterTime, stairMasterSpeed, stairMasterDistance){
            StairMasterWorkout.insert({
                Time: new Date(), 
                workoutTime: stairMasterTime,
                Speed: stairMasterSpeed,
                Distance: stairMasterDistance
            });
        },

        // THE NEXT TWO METHODS WERE COPIED DIRECTLY FROM THE publicastions.js IN CASE IT WAS NEEDED 
        
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



        //THIS IS A SEPRATE, COMMENTED OUT BLOCK WHICH WAS ALREADY HERE. 
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
                Time: new Date(), 
                workoutTime: ellipticalTime, 
                Speed: ellipticalSpeed,
                Distance: ellipticalDistance
            });
        },

        'addCyclingCardioToDB': function(cyclingTime , cyclingSpeed , cyclingDistance){
            CyclingCardio.insert({
                Time: new Date(), 
                workoutTime: cyclingTime, 
                Speed: cyclingSpeed,
                Distance: cyclingDistance
            });
        },

        'addWalkingCardioToDB': function(walkingTime, walkingDistance){
            WalkingCardio.insert({
                Time: new Date(), 
                workoutTime: walkingTime, 
                Distance: walkingDistance
            });
        },

        'addSwimmingWorkoutToDB': function(swimmingTime , swimmingLaps , swimmingDistance){
            SwimmingWorkout.insert({
                Time: new Date(), 
                workoutTime: swimmingTime, 
                Laps: swimmingLaps,
                Distance: swimmingDistance
            });
        },

        'addStretchToDB': function(stretch , stretchTime){
            Stretch.insert({
                Time: new Date(), 
                Name: stretch, 
                workoutTime: stretchTime, 
            });
        },

        'addYogaToDB': function(yoga , yogaTime){
            YogaFlex.insert({ 
                Name: yoga, 
                workoutTime: yogaTime, 
            });
        },

        'addPilatesToDB': function(pilates , pilatesTime){
            PilatesFlex.insert({ 
                Name: pilates, 
                workoutTime: pilatesTime, 
            });
        }


    })
