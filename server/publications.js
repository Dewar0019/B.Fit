
Meteor.publish('userExercises', function() { return Meteor.users.find({ _id: this.userId }, { fields: { savedExercises: 1 } });});
Meteor.publish('exercises', function() {return Exercises.find();});
Meteor.publish('completed',function() {return Completed.find();});


// Meteor.users.allow({
//   update: function (userId, user, fields, modifier) {
//     // can only change your own documents
//     if(user._id === userId)
//     {
//       Meteor.users.update({_id: userId}, modifier);
//       return true;
//     }
//     else return false;
//   }
// });

// I think this block of code (everything under the if(Meteor.isServer)) should be moved to a different file. 


// Meteor.publish(null, function () {
//   return Meteor.users.find({_id: this.userId}, {fields: {emails: 1, profile: 1}});
// });

Meteor.publish("userData", function () {
  if (this.userId) {
	  return Meteor.users.find({_id: this.userId}, {fields: {emails: 1, profile: 1}}); //, //{_id: this.userId},
                             //{fields: {'profile': 1, 'things': 1}});
  } else {
    this.ready();
  }
});