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
 			// make testVariable a Var in final version 
 			testVariable = response.outcomes;
     		console.log("success!", response);
     		exerciseCommands(testVariable);
     		// recordExercise(testVariable);
 		}
	});
	console.log("Sentence Sent");
}


var Small = {
	'zero': 0,
	'one': 1,
	'two': 2,
	'three': 3,
	'four': 4,
	'five': 5,
	'six': 6,
	'seven': 7,
	'eight': 8,
	'nine': 9,
	'ten': 10,
	'eleven': 11,
	'twelve': 12,
	'thirteen': 13,
	'fourteen': 14,
	'fifteen': 15,
	'sixteen': 16,
	'seventeen': 17,
	'eighteen': 18,
	'nineteen': 19,
	'twenty': 20,
	'thirty': 30,
	'forty': 40,
	'fifty': 50,
	'sixty': 60,
	'seventy': 70,
	'eighty': 80,
	'ninety': 90
};

var Magnitude = {
   'thousand':     1000,
   'million':      1000000,
   'billion':      1000000000,
   'trillion':     1000000000000,
   'quadrillion':  1000000000000000,
   'quintillion':  1000000000000000000,
   'sextillion':   1000000000000000000000,
   'septillion':   1000000000000000000000000,
   'octillion':    1000000000000000000000000000,
   'nonillion':    1000000000000000000000000000000,
   'decillion':    1000000000000000000000000000000000,
};

var a, n, g;

function text2num(s) {
   a = s.toString().split(/[\s-]+/);
   n = 0;
   g = 0;
   a.forEach(feach);
   return n + g;
}

function feach(w) {
   var x = Small[w];
   if (x != null) {
       g = g + x;
   }
   else if (w == "hundred") {
       g = g * 100;
   }
   else {
       x = Magnitude[w];
       if (x != null) {
           n = n + g * x
           g = 0;
       }
   }
}

function tryCatchBlock(variable) {
	try {

		var spaceValue = sets.indexOf(" ");

		variable = variable.substring(0, spaceValue)

		newVariable = text2num(variable)

		if (newVariable == 0){
			variable = parseInt(variable)
		} else {
			variable = newVariable
		}

		console.log("Variable: " + variable + " " + typeof variable)
		return sets

	} catch (e){
		variable = parseInt(prompt("You did not specify " + variable + ". Please add it in manually"));
		console.log("manually entered " + variable + " " + typeof sets)
	}

}

function recordExercise(testVariable) {
	var name; 
	var sets = testVariable[0].entities.sets[0].value;
	var reps = testVariable[0].entities.reps[0].value;; 
	var weight = testVariable[0].entities.weight[0].value;;

	sets = tryCatchBlock(sets);
	reps = tryCatchBlock(reps);
	weight = tryCatchBlock(weight);


	try {
		name = testVariable[0].entities.exerciseName[0].value;
		console.log("Name: " + name);
	} catch(e) {
		console.log("Name was not recorded");
		prompt("You did not specify an exercise name. Please add it manually");
	}

	Completed.insert({
		Name: name, 
		Sets: sets,
		Reps: reps,
		Weight: weight,
		CompletedOn: new Date()
	})

}

function exerciseCommands(action) {

	if(testVariable[0]._text.indexOf("next exercise") > 0)
		console.log("next exercise recognized")
	var routine = Session.get('forCompletedRoutine'); //Grabs the selected routine currently being viewed
	for(var i = 0; i< routine.exercises.length; i++) {
		if( $.inArray(routine.exercises[i], checkedExercises) == -1) { //checks to see if exercise is within array
			var nextExercise = "Your next exercise is " + routine.exercises[i].Sets + " sets" + "and " + routine.exercises[i].Reps + " reps of " + routine.exercises[i].Name
			var msg = new SpeechSynthesisUtterance(nextExercise);//constructor for voice speech
			var voices = window.speechSynthesis.getVoices();
			msg.voice = voices[1]; 
			window.speechSynthesis.speak(msg);
			return;
		}
	}
}

