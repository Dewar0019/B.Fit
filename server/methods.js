    Meteor.methods({
        'searchButton' : function(input) {
              Search.find({
             input: input
            });
        },
        
        searchExercises: function(current) {
        exercise = null;

        for (var i = 0; i < Exercises.find().count(); i++) {
            // get location
            Meteor.call(Exercises.find().fetch(),
                function(error, data) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        exercises = data;
                    }
            });

            if (exercise) {
                exercise = [Exercises.find().fetch()];
                break;
            }
        }

        
        return exercise;
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
        

        'addToRoutine': function(exercise, getRoutine) {  //this will add new exercise to routine
            var currentTime = new Date(); //Grab the current time
            Intermediate.insert({ //This is the actual object that will be added to the routine
                Name: exercise.Name, 
                Sets: exercise.Sets,
                Reps: exercise.Reps,
                Weight: exercise.Weight,
                AddedOn: currentTime,
                AddedBy: Meteor.userId()
            });
             var justAdded = Intermediate.findOne({AddedOn: currentTime, AddedBy: Meteor.userId()}); //grab the exercise that was just added
             getRoutine.exercises.push(justAdded); //add exercise onto array of exercises
             Routines.update({_id: getRoutine._id}, {$set: {exercises: getRoutine.exercises}}); //update the routine with the new exercises
             return Routines.findOne({_id: getRoutine._id});
            

         }
    })