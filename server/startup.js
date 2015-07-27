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

		if(ProfileImages.find({}).count()==0){
			ProfileImages.insert({address:"http://www.ucarecdn.com/8dcefd9d-e5da-4d9b-8aec-f8c4669fad95/"});
		}
	});


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
					Category:"Shoulder",
					Name: "Lateral Dumbbell Raise",
					Sets: 4,
					Reps: 10,
					Weight: 10
				},

				{
					Category:"Shoulder",
					Name: "Cable Shoulder Shrugs",
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

<<<<<<< HEAD
	if(UserWeight.find().count() == 0) {
		UserWeight.insert({
			weight: 190,
			dateAdded: "2015-01-01",
		})

		UserWeight.insert({
			weight: 189.2,
			dateAdded: "2015-01-05",
		})

		UserWeight.insert({
			weight: 188.5,
			dateAdded: "2015-01-06",
		})

		UserWeight.insert({
			weight: 187,
			dateAdded: "2015-01-13",
		})

		UserWeight.insert({
			weight: 186.7,
			dateAdded: "2015-01-18",
		})

		UserWeight.insert({
			weight: 186,
			dateAdded: "2015-01-19",
		})

		UserWeight.insert({
			weight: 188,
			dateAdded: "2015-01-21",
		})

		UserWeight.insert({
			weight: 186,
			dateAdded: "2015-01-23",
		})

		UserWeight.insert({
			weight: 184,
			dateAdded: "2015-01-29",
		})

		UserWeight.insert({
			weight: 182,
			dateAdded: "2015-02-05",
		})

		UserWeight.insert({
			weight: 179,
			dateAdded: "2015-02-13",
		})

		UserWeight.insert({
			weight: 180,
			dateAdded: "2015-02-14",
		})

		UserWeight.insert({
			weight: 176,
			dateAdded: "2015-02-21",
		})

		UserWeight.insert({
			weight: 170,
			dateAdded: "2015-02-28",
		})	
	}

=======
		//////////////////////////////////////////////////

		Routines.insert({
			_uID: "preset" ,
			routineName: "Beginner 1",
			exercises: [
				{
					Category: "Chest",
					Name: "Dumbbell Bench Press",
					Sets: 3,
					Reps: 10,
				},

				{
					Category:"Back",
					Name: "Lateral PullDown",
					Sets: 3,
					Reps: 10,
				},

				{
					Category:"Shoulders",
					Name: "Overhead Dumbbell Press",
					Sets: 3,
					Reps: 10,
				},

			],

			createdAt: new Date(),
			timesCompleted: 0,
			avgComplete: "0:00:00",
		})
	}
>>>>>>> 13d02bbb4a4b3192b01cdd6e8dafc10cbd5dbd28

	if(Cardio.find().count()== 0) {

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-01-01",
			Distance: 5,
			Time: 20
		})

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-01-07",
			Distance: 2,
			Time: 30
		})

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-01-14",
			Distance: 6,
			Time: 60
		})

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-01-21",
			Distance: 5,
			Time: 40
		})

		Cardio.insert({
			CardioName: "Walking",
			analyticsDate: "2015-01-28",
			Distance: 2,
			Time: 30,
		})

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-02-04",
			Distance: 5.5,
			Time: 15
		})

		Cardio.insert({
			CardioName: "Walking",
			analyticsDate: "2015-02-11",
			Distance: 5,
			Time: 14
		})

		Cardio.insert({
			CardioName: "Walking",
			analyticsDate: "2015-02-18",
			Distance: 6,
			Time: 13
		})

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-02-25",
			Distance: 7,
			Time: 12
		})

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-02-30",
			Distance: 6,
			Time: 11
		})

		Cardio.insert({
			CardioName: "Walking",
			analyticsDate: "2015-03-04",
			Distance: 6,
			Time: 10
		})

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-03-11",
			Distance: 3,
			Time: 9
		})

		Cardio.insert({
			CardioName: "Running",
			analyticsDate: "2015-03-18",
			Distance: 6,
			Time: 8
		})

		Cardio.insert({
			CardioName: "Walking",
			analyticsDate: "2015-03-25",
			Distance: 6,
			Time: 7
		})

		Cardio.insert({
			CardioName: "Walking",
			analyticsDate: "2015-03-30",
			Distance: 8,
			Time: 6
		})
	}

	if(ExercisesCardio.find().count()== 0) {

		ExercisesCardio.insert({
			Name: "Aerobics",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Elliptical",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Field Sports",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Indoor Cycling",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Inline Skating",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Mountain Biking",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Recumbent Bike",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Road Cycling",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Rowing",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Running",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Stationary Bike",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Step Machine",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Swimming",
			Type: "cardio"
		}),

		ExercisesCardio.insert({
			Name: "Walking",
			Type: "cardio"
		})
	}
}
