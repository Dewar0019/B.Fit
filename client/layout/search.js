Exercises.initEasySearch(['exerciseName','category'],
	{
		'limit':30
	});

Template.search.helpers({
	searchTerm:function(){
		return Session.get("searchTerm");
	}
});