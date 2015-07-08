Template.exerciseLog.helpers({
	'completedExercise':function(){
		today = new Date()
		yesterday = new Date(today.getTime() - 120000)
		// should be 86400000

		return Completed.find( {CompletedOn:{$gt:yesterday} }, {sort: {CompletedOn: -1}} )
	}
})

Template.exerciseLog.events({

	'submit #addCompletedExercise': function(event){

		event.preventDefault();
		console.log("Exercise Added");
	
		var name = event.target.nameOfExercise.value;
		var sets = event.target.numOfSets.value;
		var reps = event.target.numOfReps.value;
		var weight = event.target.weight.value;
				
		Completed.insert({
			Name: name, 
			Sets: sets,
			Reps: reps,
			Weight: weight,
			CompletedOn: new Date()
			
		})
	},

	'click #start_button': function(event){
		startDictation(event);
	}
})


/*
  This code comes from this blog post by Amit Agarwal
	  http://ctrlq.org/code/19680-html5-web-speech-api
*/

final_transcript = '';

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
		var interim_transcript = '';

	  	for (var i = event.resultIndex; i < event.results.length; ++i) {
			console.log("i="+i+" words="+words);
			var words = event.results[i][0].transcript;
			
			if (words.includes("stop dictation")) {
			recognition.stop();
			} else if (words.includes("read it back")){
				var msg = new SpeechSynthesisUtterance(words);
				window.speechSynthesis.speak(msg);
			}
		
			if (event.results[i].isFinal) {
				console.log("final result is |"+event.results[i][0].transcript.trim()+"|");
				final_transcript += capitalize(event.results[i][0].transcript.trim()) +"\n";
				console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
				sendSentence(final_transcript);
			} else {
		  		interim_transcript += Math.round(100*event.results[i][0].confidence) + "%: "+ event.results[i][0].transcript+"<br>";
		  		console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
			}
		}

		//final_transcript = capitalize(final_transcript);
		final_span.innerHTML = linebreak(final_transcript);
		interim_span.innerHTML = linebreak(interim_transcript);
	};
}
	
 
var two_line = /\n\n/g;
var one_line = /\n/g;

function linebreak(s) {
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
 
function capitalize(s) {
  	return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}
 
function startDictation(event) {
	if (recognizing) {
		recognition.stop();
		console.log("dictation stopped");
		return;
 	}
	  
	final_transcript = '';
 	recognition.lang = 'en-US';
  	recognition.start();
 	final_span.innerHTML = '';
  	interim_span.innerHTML = '';
}

function sendSentence(sentence){
	console.log("sending sentence");

	$.ajax({
 		url: 'https://api.wit.ai/message',
 		data: {
   			'q': sentence,
   			'access_token' : 'D4PLZXVAAU5VA4OF7T365EJSDOERBI3P'
 		},
 		
 		dataType: 'jsonp',
 		method: 'GET',
 		success: function(response) {
 			testVariable = response.outcomes;
     		console.log("success!", response);
 		}
	});

	console.log("Sentence Sent");
}

