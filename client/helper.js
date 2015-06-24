UI.registerHelper('getRoutines', function() {return Routines.find({_uID: Meteor.userId()}).fetch();})
UI.registerHelper('getUserId', function() {return Meteor.userId();});

Template.addToRoutines.events({ 
 'click .addTo' :function() {
        console.log("this is exercise");
        var exercise = this;
        console.log(exercise);
        Session.set('goingToAdd', exercise);
        if(Meteor.userId() == null) {
          alert("Please log in first");
        } 
      },

        'click .selectedRoutine' :function() {
            console.log("Actual Routine");
            var getRoutine = this.exercises;
            console.log(getRoutine);
            var exo = Session.get('goingToAdd');
            console.log("going to add");
            console.log(exo);
            getRoutine.push(exo);
            Routines.update({_id: this._id}, {$set: {exercises: getRoutine}});
        }
    })