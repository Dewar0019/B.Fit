Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});
Router.route('/about', {name: 'about'});
Router.route('routines');
Router.route('/chart', {name: 'chart'});
Router.route('profile');
Router.route('exerciseLog');
Router.route('createRoutine')
Router.route('/login', {name:'login'});
Router.route('routineExercises/:_id', {name:'routineExercises', data: function(){ return Routines.findOne({_id:this.params._id})}});
Router.route('exercises/:_id', {name:'exercises', data: function(){ return Routines.findOne({_id:this.params._id})}});
Router.route('exercisesEdit/:_id', {name:'exercisesEdit', data: function(){ return Exercises.findOne({_id:this.params._id})}});
Router.route('introduction', {name: "ionLoading"});
Router.route('editRoutine/:_id', {name:'editRoutine', data: function(){ return Routines.findOne({_id:this.params._id})}});
Router.route('/search/:_term', {name: 'search',
	data:function(){
		return Session.get("searchTerm");
	}
});