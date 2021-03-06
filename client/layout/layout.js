
Template.layout.events({
	'click .startDictation': function(event){
		startDictation(event);

	}
})

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-left",
  "preventDuplicates": true,
  "showDuration": "5000",
  "hideDuration": "5000",
  "timeOut": "12000",
  "extendedTimeOut": "5000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  "onclick": function() { console.log("clicked");},
}



function timeOutEvent() {
		t = setTimeout(function() {
		recognizing = false;
		recognition.stop();
	  	console.log("Dictation Time Out");
	  	toastr.info("Dictation Timed Out, we didn't get a response", "Mic is now Off");
	  	stopListening.play();
		}, 12000);
}

function stopTimeOutEvent() {
	clearTimeout(t);
	// toastr.clear()
	console.log("cleared timeoutEvent");
}

/*
This code comes from this blog post by Amit Agarwal
http://ctrlq.org/code/19680-html5-web-speech-api
*/

final_transcript = '';
final_span = '';
interim_span = '';
var startListening = new Audio('listening2.wav');
var stopListening = new Audio('stop.wav');
var recognizing = false; //This is a boolean to indicate whether or not recognition is on



if ('webkitSpeechRecognition' in window) {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onstart = function() {
		final_transcript = '';
		final_span = '';
		interim_span = '';
		timeOutEvent();
		console.log("Started Dictation");
		recognizing = true;
		toastr.info("Please give me a command", "I'm Listening!");
		startListening.play();
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
		if(recognizing) {
			for (var i = event.resultIndex; i < event.results.length; ++i) {

				var words = event.results[i][0].transcript;

				if (event.results[i].isFinal) {
					console.log("final result is |"+event.results[i][0].transcript.trim()+"|");
					final_transcript += capitalize(event.results[i][0].transcript.trim());
					console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
					recognition.stop();
					recognizing = false;
					sendSentence(final_transcript);
					stopTimeOutEvent()

				} else {
					interim_transcript += Math.round(100*event.results[i][0].confidence) + "%: "+ event.results[i][0].transcript+"<br>";
					console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
				}
			}
		}

		final_span = linebreak(final_transcript);
		interim_span = linebreak(interim_transcript);
	};
}

	function capitalize(s) {
	return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
			}
	var two_line = /`\n`\n/g;
	var one_line = /\n/g;

	function linebreak(s) {
		return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
	}

function startDictation(event) {
	if (recognizing) {
		stopTimeOutEvent();  //Stops the timeout event if it hasn't been 15 seconds
		recognizing = false;
		recognition.stop();
		stopListening.play();
		console.log("dictation stopped");
	} else {
		recognition.start();
		recognition.lang = 'en-US';
		final_transcript = '';
		final_span = '';
		interim_span = '';
	}

}

function capitalize(s) {
	return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

	function sendSentence(sentence){
		console.log("sending sentence");
		toastr.info(final_transcript, "You said: ");
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
				if(testVariable[0].confidence < 0.95) {
					toastr.info("We didn't catch that, could you try again", "Sorry!");
				} else if(testVariable[0].intent == "navigation") {
					navigation(testVariable);
				}
				else if(testVariable[0].intent == "exercise_progress") {
					console.log("exercise_progress");
					if(testVariable[0].entities.hasOwnProperty("exercises_left")) {
						exercisesLeft(testVariable);
					} else if(testVariable[0].entities.hasOwnProperty("progress")) {
						nextExerciseCommand(testVariable);
					} else if(testVariable[0].entities.hasOwnProperty("finish")) {
						finishWorkout(testVariable);
					}
				} else if (testVariable[0].intent == "logCardioIntent"){
					recordCardio(testVariable);
				} else {
					recordExercise(testVariable);
				}
			}
		});
		interim_span = '';
		console.log("Sentence Sent");
	}

	//This code here is to change text into numbered format
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

	function recordExercise(testVariable) {
		var name;
		var sets;
		var reps;
		var weight;


		// try catch is used in case the user did not specify the sets, reps, or weight value. In case they did not, the error is caught and a prompt
		// asks the user to enter in the value manually.

		//SETS TRY CATCH BLCOK
		try {

			//gets the sets value from the wit.ai output
			sets = testVariable[0].entities.sets[0].value
			var spaceValue = sets.indexOf(" ");

			// gets the number from wit.ai whether the value was '10', 'ten' or 10 and ensures the final value is a number
			sets = sets.substring(0, spaceValue)

			newSets = text2num(sets)

			if (newSets == 0){
				sets = parseInt(sets)
			} else {
				sets = newSets
			}

			console.log("Sets: " + sets + " " + typeof sets)

		} catch (e){
			sets = parseInt(prompt("We didn't quite catch what you said for sets. Could you please enter it."));
			console.log("manually entered sets " + sets + " " + typeof sets)
		}



		//REPS TRY CATCH BLOCK
		try {
			// gets the reps value from the wit.ai output.
			reps = testVariable[0].entities.reps[0].value
			// gets the first index of where a space occurs
			var spaceValue = reps.indexOf(" ");

			// newReps will be used to determine if wit.ai captured "of 10 reps" or "10 reps"
			newReps = reps.substring(0,spaceValue);


			// this is in case wit.ai records "of 10 reps" as the value.
			if (newReps == "of"){
				lastSpaceValue = reps.lastIndexOf(" ");
				reps = reps.substring(spaceValue,lastSpaceValue);
			}

			//converts reps to a number value. If the value is 0 it is because reps is 10 as a string and not a number so parseInt is then used.
			newReps = text2num(reps);

			if (newReps == 0) {
				reps = parseInt(reps)
			} else {
				reps = newReps
			}

			console.log("Reps: " + reps + " " + typeof reps);

		} catch (e){
			reps = parseInt(prompt("We didn't quite catch what you said for the number of reps. \nCould you please enter it."));
			console.log("manually entered reps " + reps + " " + typeof reps)
		}




		//WEIGHT TRY CATCH BLOCK
		try {
			weight = testVariable[0].entities.weight[0].value;
			var spaceValue = weight.indexOf(" ");
			weight = weight.substring(0,spaceValue);
			newWeight = text2num(weight);

			if (newWeight == 0) {
				weight = parseInt(weight)
			} else {
				weight = newWeight
			}

			console.log("Weight: " + weight + " " + typeof weight);

		} catch(e){
			weight = parseInt(prompt("We didn't quite catch what you said for the weight. \nCould you please enter it."));
			console.log("manually entered weight " + weight + " " + typeof weight)
		}



		//NAME TRY CATCH BLOCK
		try {
			name = testVariable[0].entities.exerciseName[0].value;
			console.log("Name: " + name);
			name = toTitleCase(name)
		} catch(e) {
			console.log("Name was not recorded");
			prompt("We didn't quite catch the name of the exercise. \nCould you please enter it.");
		}

		Meteor.call('addToStrengthCollection', name, sets, reps, weight);

		// sets the fromDate for the display of the log page to today if it has not already been chosen by the user so the information the user
		// just enetered is displayed.
		if (Session.get("fromDate") == undefined ){
			today = new Date()
			fromDate = new Date(today.getTime() - 86400000)
			console.log("today was pressed")
			Session.set("fromDate", fromDate);
		}
	}

	// USE THIS FOR STORING THE DATE IN THE RIGHT FORMAT FOR CARDIO
	// THIS WILL BE USED FOR THE ANALYTICS WHEN DISPLAYING THE DATE
	// New Test: {{moFormat CompletedOn 'YYYY-MM-DD'}}

	function recordCardio(testVariable) {

		var name;
		var time;
		var distance;
		var calories

		//NAME TRY CATCH BLOCK

		var presentTense;

		try {
			if (testVariable[0].entities.running != undefined){
				name = "Running";
				presentTense = "run";
			} else if (testVariable[0].entities.biking != undefined) {
				name = "Biking";
				presentTense = "bike";
			} else if (testVariable[0].entities.cycling != undefined) {
				name = "Cycling";
				presentTense = "cycle";
			} else if (testVariable[0].entities.swimming != undefined) {
				name = "Swimming";
				presentTense = "swim";
			} else if (testVariable[0].entities.rowing != undefined) {
				name = "Rowing";
				presentTense = "row";
			} else if (testVariable[0].entities.rowing != undefined) {
				name = "Walking";
				presentTense = "walk";
			}


		} catch (e){
			name = prompt("What exercise did you do");
			console.log("manually entered name " + name + typeof name);

		}

		//TIME TRY CATCH BLCOK
		try {
			//gets the sets value from the wit.ai output
			time = testVariable[0].entities.duration[0].value
			// gets the number from wit.ai whether the value was '10', 'ten' or 10 and ensures the final value is a number
			console.log("time: " + time + " " + typeof time)
		} catch (e){
			time = parseInt(prompt("How long did you " + presentTense + " for?"));
			console.log("manually entered time " + time + " " + typeof time)
		}

		//DISTANCE TRY BLOCK
		try {
			//gets the sets value from the wit.ai output
			distance = testVariable[0].entities.distance[0].value
			// gets the number from wit.ai whether the value was '10', 'ten' or 10 and ensures the final value is a number
			console.log("distance: " + distance + " " + typeof distance)
		} catch (e){
			distance = parseInt(prompt("How far did you " + presentTense + ". (Enter the number)?"));
			console.log("manually entered distance " + distance + " " + typeof distance)
		}

		//CALORIES TRY BLOCK
		try {
			//gets the sets value from the wit.ai output
			calories = testVariable[0].entities.calories[0].value
			// gets the number from wit.ai whether the value was '10', 'ten' or 10 and ensures the final value is a number
			console.log("calories: " + calories + " " + typeof calories)
		} catch (e){
			calories = "N/A"
		}
		usableDateObj = analyticsDate();

		Cardio.insert({
			_uID: Meteor.userId(),
			Name: name,
			Time: time,
			Distance: distance,
			Calories: calories,
			CompletedOn: new Date(),
			analyticsDate: usableDateObj
		})

		// sets the fromDate for the display of the log page to today if it has not already been chosen by the user so the information the user
		// just enetered is displayed.
		if (Session.get("fromDate") == undefined ){
			today = new Date()
			fromDate = new Date(today.getTime() - 86400000)
			console.log("today was pressed")
			Session.set("fromDate", fromDate);
		}
	}

	//This is the voice command for "Next Exercise"
	function nextExerciseCommand(action) {
		var nextExercise = Session.get("voiceNextExercise");
		var voices = window.speechSynthesis.getVoices();
		if(nextExercise != null) {
			var voiceExercise = "Your next exercise is " + nextExercise.Sets + " sets" + "and " + nextExercise.Reps + " reps of " + nextExercise.Name
			var msg = new SpeechSynthesisUtterance(voiceExercise);//constructor for voice speech
		} else {
			var msg = new SpeechSynthesisUtterance("There are no more exercises");//constructor for voice speech
		}
		msg.voice = voices[1];
		window.speechSynthesis.speak(msg);
	}

	function exercisesLeft(action) {
		var counter = 0;
		var voices = window.speechSynthesis.getVoices();
		checkedExercises.forEach(function(obj) {
			if(obj.checked == false)
				counter++;
		});
		if(counter > 0 ) {
			var msg = new SpeechSynthesisUtterance("You have " + counter + " exercises remaining");
		} else {
			var msg = new SpeechSynthesisUtterance("There are no more exercises");//constructor for voice speech
		}
		msg.voice = voices[1];
		window.speechSynthesis.speak(msg);
	}

	function navigation(action) {
		if (action[0].entities.hasOwnProperty("analytics")) {
			setTimeout( function() {
				toastr.clear();
				Router.go("chart")}, 3000);
		}
		 else if(action[0].entities.hasOwnProperty("my_routines")) {
			setTimeout( function() {
				toastr.clear();
				Router.go("routines")}, 3000);
		}
		else if(action[0].entities.hasOwnProperty("exerciseLog")) {
			setTimeout( function() {
				toastr.clear();
				Router.go("exerciseLog")}, 3000);
			}
		}

		function finishWorkout(action) {
			if(Session.get("workoutStarted")) {
				confirmFinish();
			} else {
				IonPopup.alert({
			      title: 'You can\t finish a workout you haven\'t started!',
			      template: 'Head to the Routines Page to start a workout',
			      okText: 'Got It.'
    });
				toastr.clear();
			}
		}

	analyticsDate = function(){
		var d = new Date()
		var year = d.getFullYear()
		var month = (d.getMonth() + 1)
		var day = d.getDate().toString();

		if (month >= 1 && month <= 9){
			month = "0"+ month.toString();
		}

		if (day >= 1 && day <= 9){
			day = "0"+ day.toString();
		}

		usableDateObj = year + "-" + month + "-" + day
		return usableDateObj
	}

	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
