Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});
Router.route('/about', {name: 'about'});
Router.route('routines');
// Router.route('/arms', {name: 'arms'});
// Router.route('/legs', {name: 'legs'}); 
// Router.route('/chest', {name: 'chest'});
// Router.route('/running', {name: 'running'});
// Router.route('/elliptical', {name: 'elliptical'});
// Router.route('/stairmaster', {name: 'stairmaster'});
// Router.route('/cycling', {name: 'cycling'});
// Router.route('/stairMaster', {name: 'stairMaster'});
// Router.route('/walking', {name: 'walking'});
// Router.route('/swimming', {name: 'swimming'});
// Router.route('/stretching', {name: 'stretching'});
// Router.route('/yoga', {name: 'yoga'});
// Router.route('/pilates', {name: 'pilates'});
Router.route('/chart', {name: 'chart'});
Router.route('profile');
Router.route('exerciseLog');
Router.route('createRoutine')

Router.route('/core', {name: 'core'});
Router.route('/login', {name:'login'});
Router.route('routineExercises/:_id', {name:'routineExercises', data: function(){ return Routines.findOne({_id:this.params._id})}});
Router.route('exercises/:_id', {name:'exercises', data: function(){ return Routines.findOne({_id:this.params._id})}});
// Router.route('/routines/:_id', 
// Router.route('/profileEdit/:_id', {name:'profileEdit', data: function(){ return Meteor.users.findOne({_id:this.params._id})}});

Router.route('/search/:_term', {name: 'search',
	data:function(){
		return Session.get("searchTerm");
	}
});