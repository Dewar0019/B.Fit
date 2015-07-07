Template.createRoutine.events({ 
	'submit #addRoutine':function (event) {
		event.preventDefault();
		var list = event.target.egg.value;
		console.log(list);
	}
})