    Meteor.methods({
        'searchButton' : function(input) {
              Search.find({
             input: input
            });
        },

        'createNewRoutine' : function(name) {
              return Routines.insert(
                    {
                     _uID: Meteor.userId(),
                     routineName: name,
                     exercises: [],
                     createdAt: new Date()
                    },function(error, result){
                        console.log(error,result);
                        if(!error){
                            return result;
                        }else{
                            alert("error");
                        }
                });

          },
              // var justCreated = Routines.findOne({_uID: Meteor.userId(), routineName: name});           
              // console.log(justCreated);
              // return justCreated;
                // Session.set('recentAdd', Routines.findOne({_uID: Meteor.userId(), routineName: name}));
        

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


        'addLegExerciseToDB': function(legExercise, legSets, legReps, legWeight){
            LegExercises.insert({
                Name: legExercise, 
                Sets: legSets,
                Reps: legReps,
                Weight: legWeight
            });
        }
    })


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

    // }
