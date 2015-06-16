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
Router.route('/running', {name: 'running'});
Router.route('/elliptical', {name: 'elliptical'});


Router.route('/profile/:_id', {name:'profile', data: function(){ return Meteor.users.findOne()}});
Router.route('/core', {name: 'core'});
Router.route('/login', {name:'login'});
Router.route('/profile/:_id/profileSavedExercises', {name:'profileSavedExercises', data: function(){ return Meteor.users.findOne({_id:this.params._id})}});
Router.route('/profileEdit/:_id', {name:'profileEdit', data: function(){ return Meteor.users.findOne({_id:this.params._id})}});
