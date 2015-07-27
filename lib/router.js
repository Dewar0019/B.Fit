Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'introduction'});
Router.route('/about', {name: 'about'});
Router.route('routines');
Router.route('/chart', {name: 'chart'});
Router.route('profile');
Router.route('imageedit');
Router.route('exerciseLog');
Router.route('createRoutine');
Router.route('welcome');
Router.route('/login', {name:'login'});
Router.route('routineExercises/:_id', {name:'routineExercises', data: function(){ return Routines.findOne({_id:this.params._id})}});
Router.route('exercises/:_id', {name:'exercises', data: function(){ return Routines.findOne({_id:this.params._id})}});
Router.route('exercisesEdit/:_id', {name:'exercisesEdit', data: function(){ return Exercises.findOne({_id:this.params._id})}});

Router.route('/test', {name:'test'});
Router.route('weightProgress/:_id', {name:'weightProgress', data: function(){ return Meteor.users.findOne({_id:this.params._id})}});