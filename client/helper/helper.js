


UI.registerHelper('getRoutines', function() {return Routines.find({_uID: Meteor.userId()}).fetch();})
UI.registerHelper('getUserId', function() {return Meteor.userId();});


Template.addToRoutines.events({
    'click .selectedRoutine' :function() {
        var getRoutine = this; 
        var exo = Session.get('goingToAdd'); //This is the selected exercise
        Meteor.call('createIntermediate', exo, getRoutine);
    },

    'click .createNewRoutine' : function() {

    }
})
