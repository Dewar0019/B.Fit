UI.registerHelper('getRoutines', function() {return Routines.find({_uID: Meteor.userId()}).fetch();})
UI.registerHelper('getUserId', function() {return Meteor.userId();});


Template.addToRoutines.events({ 
    'click .selectedRoutine' :function() {
        var getRoutine = this.exercises;
        var exo = Session.get('goingToAdd'); //This is the selected exercise
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
        getRoutine.push(justAdded);
        Routines.update({_id: this._id}, {$set: {exercises: getRoutine}});
    },

    'click .createNewRoutine' : function() {
           
    }
    })