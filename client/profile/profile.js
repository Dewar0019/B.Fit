Template.profile.helpers({
	photo:function(){ // returns the URL of the gravatar photo for this email
		return Gravatar.imageUrl(Gravatar.hash(Meteor.user().emails[0].address,{secure:true}))
	},
	getUserInfo: function() { return Meteor.user();},
	getEmail: function() {return Meteor.user().emails[0].address},
	getBMI: function(){return ((((Meteor.user().profile.currentWeight)/Math.pow((Meteor.user().profile.height),2))*703).toFixed(2))}
})

Template.profile.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  },

  'submit #weight': function(event) {
  	event.preventDefault();
  	var todaysDate = new Date();
  	var numb = event.target.weightEntered.value; //Grabs the weight from the form
  	UserWeight.insert({
	  	_uID: Meteor.userId(),
	  	weight: numb,
	  	dateAdded: todaysDate.getFullYear() + '-' + todaysDate.getMonth() + '-' + todaysDate.getDay(),
  	});
  	toastr.success("Got your Weight!", "Weight Recorded");  
  	Meteor.call('updateWeight', numb); //Updates the users profile with the new weight
  	event.target.weightEntered.value = '';
  },

  'click #viewWeightProgress': function() {
  	Router.go('weightProgress', {_id: Meteor.userId()});
  }

});

address = function(){
	console.log(ProfileImages.findOne().address);
	return ProfileImages.findOne().address;
}

Template.profile.rendered = function (){
	$('#newImage').attr('src',address);
}

