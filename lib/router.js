Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});
Router.route('/about', {name: 'about'}); 
Router.route('/arms', {name: 'arms'});
Router.route('/legs', {name: 'legs'}); 
Router.route('/chest', {name: 'chest'});
Router.route('/profile', {name:'profile', data: function(){ return Meteor.users.findOne({_id:this.params._id})}});
Router.route('/login', {name:'login'});
Router.route('/profile/profileSavedExercises', {name:'profileSavedExercises', data: function(){ return Meteor.users.findOne({_id:this.params._id})}});
Router.route('/profileEdit/:_id', {name:'profileEdit', data: function(){ return Meteor.users.findOne({_id:this.params._id})}});
