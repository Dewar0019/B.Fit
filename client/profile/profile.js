
Template.profile.helpers({
	photo:function(){ // returns the URL of the gravatar photo for this email
		return Gravatar.imageUrl(Gravatar.hash(Meteor.user().emails[0].address,{secure:true}))
	}
})

Template.profile.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  }
});