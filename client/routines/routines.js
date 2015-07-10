Template.routines.helpers({
	item: function() {return Routines.find({}).fetch()}  //Gotta change later so that it consist only of presets and user inserted routines
})

Template.routines.events({
	'click #setForCompleted' :function() {
		var routine = this;
		console.log(routine);
		Session.set('forCompletedRoutine', routine);
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


var final_transcript = '';
    var recognizing = false;
    
    if ('webkitSpeechRecognition' in window) {
        console.log("webkit is available!");
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
 
        recognition.onstart = function() {
          recognizing = true;
        };
 
        recognition.onerror = function(event) {
          console.log(event.error);
        };
 
        recognition.onend = function() {
          recognizing = false;
        };
    recognition.onresult = function(event) {
            myevent = event;
            var interim_transcript ='';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              console.log("i="+i);
            if(event.results[i][0].transcript.includes("okay")){
                interim_transcript += event.results[i][0].transcript;
                console.log("stop");
                recognition.stop();
                
                 var mmm=interim_transcript;
                var lll = mmm.substring(0,mmm.indexOf("ok"));
            OnChange(lll);
                return;
            }else if (event.results[i][0].transcript.includes("cancel")) {
                    $('#q').val('');
                    recognition.stop();
                    return;
            }
            if (event.results[i].isFinal) {
                final_transcript+=event.results[i][0].transcript;
              console.log('final events.results[i][0].transcript ='+ JSON.stringify(event.results[i][0].transcript));
            } else {
              interim_transcript+=event.results[i][0].transcript;
              console.log('interim events.results[i][0].transcript ='+ JSON.stringify(event.results[i][0].transcript));
            }
          }
          //final_transcript = capitalize(final_transcript);
          //final_span.innerHTML = linebreak(final_transcript);
          //interim_span.innerHTML = linebreak(interim_transcript);
            
        $('#q').val(interim_transcript);
        
        var cmd=interim_transcript;      
        var string2 = cmd.substring(1);
        if(cmd.indexOf(" ")==0){
            OnChange(cmd);
        }else{
        OnChange(string2);
        }
        };
    }
    