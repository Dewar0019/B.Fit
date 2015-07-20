if(Meteor.isServer){

	Meteor.startup(function(){

		if (Exercises.find().fetch()==0){
			exerciseStartup.data.forEach(function(exercise) {
				Exercises.insert({
					Name: exercise.exercisename[0],
					Type: [exercise.primary[0], exercise.secondary[0]],
					Instructions: splitString(exercise.steps[0], '. '),
					start: exercise.startimg[0],
					end: exercise.endimg[0]
				})
			});
		}
	});

	// if (Cardio.find().fetch()==0){

	// 		Cardio.insert({
	// 				Name: "Aerobics",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			// Cardio.insert({
	// 			// 	Name: "Boxing",
	// 			// 	Type: "cardio"
	// 			// 	// Instructions: "splitString(exercise.steps[0], '. '),
	// 			// 	// start: "exercise.startimg[0],
	// 			// 	// end: "exercise.endimg[0]
	// 			// }),
	// 			Cardio.insert({
	// 				Name: "Elliptical",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Field Sports",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Indoor Cycling",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Inline Skating",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Mountain Biking",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Recumbent Bike",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Road Cycling",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Rowing",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Running",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Stationary Bike",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Step Machine",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Swimming",
	// 				Type: "cardio"
	// 				// Instructions: "splitString(exercise.steps[0], '. '),
	// 				// start: "exercise.startimg[0],
	// 				// end: "exercise.endimg[0]
	// 			}),
	// 			Cardio.insert({
	// 				Name: "Walking",
	// 				Type: "cardio"
	// 				// Instructions: splitString(exercise.steps[0], '. '),
	// 				// start: exercise.startimg[0],
	// 				// end: exercise.endimg[0]
	// 			})

	// }




	function splitString(steps, seperator) {
		var arrayOfStrings = steps.split(seperator);
		return arrayOfStrings;
	}

	if(Routines.find().count()== 0) {
		Routines.insert({
			_uID: "preset" ,
			routineName: "Ice Cream Fitness",
			exercises: [
				{
					Category: "core",
					Name: "Crunches",
					Sets: 1,
					Reps: 25
				},

				{
					Category: "core",
					Name: "Bicycles",
					Sets: 1,
					Reps: 50
				},

				{
					Category: "core",
					Name: "Plank",
					Sets: 1,
					Time: "1 Minute"
				},

				{
					Category:"Shoulder",
					Name: "Cable Lat Raise",
					Sets: 4,
					Reps: 10,
					Weight: 10
				},

				{
					Category:"Shoulder",
					Name: "Shoulder Shrugs",
					Sets: 3,
					Reps: 10,
					Weight: 20
				},

				{
					Category:"Shoulder",
					Name: "Standing Pull Down",
					Sets: 3,
					Reps: 10,
					Weight: 20
				},

				{
					Category:"Shoulder",
					Name: "Shoulder Press",
					Sets: 3,
					Reps: 10,
					Weight: 60
				},

				{
					Category:"Back",
					Name: "Back Extention",
					Sets: 4,
					Reps: 10,
				},

				{
					Category:"Back",
					Name: "Dumbbell Deadlift",
					Sets: 3,
					Reps: 10,
					Weight: 70
				},

				{
					Category:"Back",
					Name: "Kneeling One Arm Row",
					Sets: 3,
					Reps: 10,
					Weight: 25
				},

				{
					Category:"Arm",
					Name: "Bicep Curl",
					Sets: 4,
					Reps: 10,
					Weight: 20
				},

				{
					Category:"Arm",
					Name: "Concentration Curl",
					Sets: 2,
					Reps: 10,
					Weight: 20
				},

				{
					Category:"Arm",
					Name: "Reverse Curl",
					Sets: 3,
					Reps: 10,
					Weight: 20
				},
			],

			createdAt: new Date(),
			timesCompleted: 0,
			avgComplete: "0:00:00",
		})
	}
	if(Cardio.find().count()== 0) {

		Cardio.insert({
			CardioName: "Running",
			date: "2015-01-01",
			distance: 5,
			time: 20
		})

		Cardio.insert({
			CardioName: "Running",
			date: "2015-01-07",
			distance: 2,
			time: 30
		})

		Cardio.insert({
			CardioName: "Running",
			date: "2015-01-14",
			distance: 6,
			time: 60
		})

		Cardio.insert({
			CardioName: "Running",
			date: "2015-01-21",
			distance: 5,
			time: 40
		})

		Cardio.insert({
			CardioName: "Walking",
			date: "2015-01-28",
			distance: 2,
			time: 30,
		})

		Cardio.insert({
			CardioName: "Running",
			date: "2015-02-04",
			distance: 5.5,
			time: 15
		})

		Cardio.insert({
			CardioName: "Walking",
			date: "2015-02-11",
			distance: 5,
			time: 14
		})

		Cardio.insert({
			CardioName: "Walking",
			date: "2015-02-18",
			distance: 6,
			time: 13
		})

		Cardio.insert({
			CardioName: "Running",
			date: "2015-02-25",
			distance: 7,
			time: 12
		})

		Cardio.insert({
			CardioName: "Running",
			date: "2015-02-30",
			distance: 6,
			time: 11
		})

		Cardio.insert({
			CardioName: "Walking",
			date: "2015-03-04",
			distance: 6,
			time: 10
		})

		Cardio.insert({
			CardioName: "Running",
			date: "2015-03-11",
			distance: 3,
			time: 9
		})

		Cardio.insert({
			CardioName: "Running",
			date: "2015-03-18",
			distance: 6,
			time: 8
		})

		Cardio.insert({
			CardioName: "Walking",
			date: "2015-03-25",
			distance: 6,
			time: 7
		})

		Cardio.insert({
			CardioName: "Walking",
			date: "2015-03-30",
			distance: 8,
			time: 6
		})
	}
}
