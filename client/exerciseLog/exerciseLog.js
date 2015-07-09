Template.exerciseLog.helpers({
	'completedExercise':function(){

		// returns everything in the Completed collection that has been added in the past 24 hours. 
		// to change the amount of time change the number below in the unit of milliseconds. 
		
		today = new Date()
		yesterday = new Date(today.getTime() - 86400000)

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
 			var testVariable = response.outcomes;
     		console.log("success!", response);
     		recordExercise(testVariable);
 		}
	});
	console.log("Sentence Sent");
}

function recordExercise(testVariable) {
	try {
		sets = testVariable[0].entities.Sets[0].value
		var spaceValue = sets.indexOf(" ");
		
		sets = sets.substring(0, spaceValue)

		if (sets == "1" || sets == "one") {
			sets = 1;
		} else if (sets == "2" || sets == "two"){
			sets = 2;
		} else if (sets == "3" || sets == "three"){
			sets = 3;
		} else if (sets == "4" || sets == "four"){
			sets = 4;
		} else if (sets == "5" || sets == "five"){
			sets = 5;
		} else if (sets == "6" || sets == "six"){
			sets = 6;
		} else if (sets == "7" || sets == "seven"){
			sets = 7;
		} else if (sets == "8" || sets == "eight"){
			sets = 8;
		} else if (sets == "9" || sets == "nine"){
			sets = 9;
		} else if (sets == "10" || sets == "ten"){
			sets = 10;
		}
	} catch (e){
		console.log("error encountered")
		promt("You did not specify sets. Please add it in manually");
		sets = 0;
	}

	try {
		reps = testVariable[0].entities.reps[0].value
		var spaceValue = reps.indexOf(" ");
		
		reps = reps.substring(0,spaceValue)

		if (reps == "1" || reps == "one") {
			reps = 1;
		} else if (reps == "2" || reps == "two"){
			reps = 2;
		} else if (reps == "3" || reps == "three"){
			reps = 3;
		} else if (reps == "4" || reps == "four"){
			reps = 4;
		} else if (reps == "5" || reps == "five"){
			reps = 5;
		} else if (reps == "6" || reps == "six"){
			reps = 6;
		} else if (reps == "7" || reps == "seven"){
			reps = 7;
		} else if (reps == "8" || reps == "eight"){
			reps = 8;
		} else if (reps == "9" || reps == "nine"){
			reps = 9;
		} else if (reps == "10" || reps == "ten"){
			reps = 10;
		}

	} catch (e){
		console.log("error encountered")
		promt("You did not specify reps. Please add it in manually");
		reps = 0;
	}

	
}

