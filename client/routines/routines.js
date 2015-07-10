Template.routines.helpers({
	item: function() {return Routines.find({}).fetch()}  //Gotta change later so that it consist only of presets and user inserted routines
})

Template.routines.events({
	'click #setForCompleted' :function() {
		var routine = this;
		Session.set('forCompletedRoutine', routine);
    console.log("routine has been set");
    console.log(routine);
	}
})

Template.routines.rendered = function() {
    OnChange =function(value){
        if (value==""){
            ShowAll();
            return;
        };
        $('#icecreamfitness').hide();
         $('#amy').hide();
        // $('#timbersaw').hide();
        

        $('div[id*="'+ value +'"]').show();
                 console.log( "Something is being searched" );
    }
     
    ShowAll =function() {
        $(".excerciselist").show();
        
    }
    
    
}



    