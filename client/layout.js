
UI.registerHelper('myRoutines', function() {return Meteor.user().savedExercises;});
UI.registerHelper('getUserId', function() {return Meteor.userId();});


UI.registerHelper('plusOne', function(number) {
    return number + 1;
});