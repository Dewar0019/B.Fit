
UI.registerHelper('myRoutines', function() {return Meteor.user().savedExercises;});
UI.registerHelper('getUserId', function() {return Meteor.userId();});