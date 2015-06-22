UI.registerHelper('getRoutines', function() {return Routines.find({_uID: Meteor.userId()}).fetch();})
UI.registerHelper('getUserId', function() {return Meteor.userId();});


