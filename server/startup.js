if(Meteor.isServer){

	Meteor.startup(function(){

		if (Exercises.find().fetch()==0){
			exerciseStartup.data.forEach(function(exercise) {
				// Leave the next line in for debugging purposes
				//console.log(JSON.stringify(exercise))
				Exercises.insert({
					Name: exercise.exercisename[0],
					Type: [exercise.primary[0], exercise.secondary[0]],
					Instructions: splitString(exercise.steps[0], '. '),
					start: exercise.startimg[0],
					end: exercise.endimg[0]
				})
			});
		}

		if (ExercisesCardio.find().fetch()==0){
			cardioStartup.data.forEach(function(exercise) {
				// Leave the next line in for debugging purposes
				console.log(JSON.stringify(exercise))
				ExercisesCardio.insert({
					Name: exercise.cardioname[0],
					Type: ["Cardio"]
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

	if(UserWeight.find().count() == 0) {
		UserWeight.insert({
			weight: 190,
			dateAdded: "2015-06-01",
		})

		UserWeight.insert({
			weight: 189.2,
			dateAdded: "2015-06-05",
		})

		UserWeight.insert({
			weight: 188.5,
			dateAdded: "2015-06-10",
		})

		UserWeight.insert({
			weight: 187,
			dateAdded: "2015-06-15",
		})

		UserWeight.insert({
			weight: 186.7,
			dateAdded: "2015-06-20",
		})

		UserWeight.insert({
			weight: 186,
			dateAdded: "2015-06-25",
		})

		UserWeight.insert({
			weight: 188,
			dateAdded: "2015-06-30",
		})

		UserWeight.insert({
			weight: 186,
			dateAdded: "2015-07-05",
		})

		UserWeight.insert({
			weight: 184,
			dateAdded: "2015-07-10",
		})

		UserWeight.insert({
			weight: 182,
			dateAdded: "2015-07-15",
		})

		UserWeight.insert({
			weight: 179,
			dateAdded: "2015-07-20",
		})

		UserWeight.insert({
			weight: 180,
			dateAdded: "2015-07-25",
		})
	}


	if(Routines.find().count()== 0) {
		Routines.insert({
			preset: true,
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
				}
			],

			createdAt: new Date(),
			timesCompleted: 0,
			avgComplete: "0:00:00",
			difficulty: [true, true, true, true, false,],
		})

		Routines.insert({
			preset: true,
			routineName: "Full Body 1",
			exercises: [
				{
					Category: "Chest",
					Name: "Dumbbell Bench Press",
					Sets: 3,
					Reps: 10,
				},

				{
					Category:"Back",
					Name: "Lateral Pulldown",
					Sets: 3,
					Reps: 10,
				},

				{
					Category:"Shoulders",
					Name: "Overhead Dumbbell Press",
					Sets: 3,
					Reps: 10,
				},

				{
					Category:"Legs",
					Name: "Leg Press",
					Sets: 3,
					Reps: 10,
				},

				{
					Category:"Arms",
					Name: "Tricep Press Down",
					Sets: 3,
					Reps: 10,
				},

				{
					Category:"Legs",
					Name: "Calf Raises",
					Sets: 3,
					Reps: 10,
				},

				{
					Category:"Abs",
					Name: "Crunches",
					Sets: 3,
					Reps: 15,
				}

			],

			createdAt: new Date(),
			timesCompleted: 0,
			avgComplete: "0:00:00",
			difficulty: [true, true, false, false, false,],
		})


		Routines.insert({
			preset: true,
			routineName: "Upper Body 1",
			exercises: [
				{
					Category: "Chest",
					Name: "Barbell Bench Press",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Chest",
					Name: "Dumbbell Flye",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Back",
					Name: "Barbell Bent Over Row",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Chest",
					Name: "Lateral Pulldown ",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Chest",
					Name: "Overhead Dumbbell Press",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Shoulders",
					Name: "Dumbbell Lateral Raise",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Arms",
					Name: "Barbell Bicep Curl",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Arms",
					Name: "Barbell Preacher Curl",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Arms",
					Name: "Tricep Press Down",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Abs",
					Name: "Crunches",
					Sets: 3,
					Reps: 15,
				}
			],

			createdAt: new Date(),
			timesCompleted: 0,
			avgComplete: "0:00:00",
			difficulty: [true, true, true, false, false,],
		})

		Routines.insert({
			preset: true,
			routineName: "Lower Body 1",
			exercises: [

				{
					Category: "Legs",
					Name: "Leg Press",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Legs",
					Name: "Leg Extention",
					Sets: 3,
					Reps: 10,
				},

				{
					Category: "Legs",
					Name: "Lying Leg Curl",
					Sets: 3,
					Reps: 12,
				},

				{
					Category: "Legs",
					Name: "Seated Leg Curl",
					Sets: 3,
					Reps: 12,
				},

				{
					Category: "Legs",
					Name: "Standing Calf Raises",
					Sets: 3,
					Reps: 17,
				},

				{
					Category: "Legs",
					Name: "Seated Calf Raises",
					Sets: 3,
					Reps: 17,
				}

			],

			createdAt: new Date(),
			timesCompleted: 0,
			avgComplete: "0:00:00",
			difficulty: [true, true, false, false, false,],
		})

		Routines.insert({
			preset: true,
			routineName: "Push Yourself!",
			exercises: [

				{
					Category: "Chest",
					Name: "Incline Barbell Bench Press",
					Sets: 4,
					Reps: 12,
				},

				{
					Category: "Chest",
					Name: "Dumbbell Flye",
					Sets: 4,
					Reps: 12,
				},

				{
					Category: "Shoulders",
					Name: "Overhead Dumbbell Press",
					Sets: 4,
					Reps: 12,
				},

				{
					Category: "Shoulders",
					Name: "Smith Machine Upright Row",
					Sets: 4,
					Reps: 10,
				},

				{
					Category: "Shoulders",
					Name: "Smith Machine Upright Row",
					Sets: 4,
					Reps: 10,
				},

				{
					Category: "Arms",
					Name: "Lying EZ-Bar Tricpes Extention",
					Sets: 3,
					Reps: 12,
				},

				{
					Category: "Arms",
					Name: "Dumbbell Kickback",
					Sets: 3,
					Reps: 10,
				}

			],

			createdAt: new Date(),
			timesCompleted: 0,
			avgComplete: "0:00:00",
			difficulty: [true, true, true, true, false,],
		})
	}

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

		var swimming = [{"CardioName":"Swimming","Distance":3,"Time":2,"analyticsDate":"2015-07-23","_id":"55b8eadd4d6f6335cd3a5b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":8,"Time":4,"analyticsDate":"2015-08-28","_id":"55b8eadd4d6f6335cd3b5b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":7,"Time":7,"analyticsDate":"2015-06-12","_id":"55b8eadd4d6f6335cd3c5b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":9,"Time":8,"analyticsDate":"2015-08-03","_id":"55b8eadd4d6f6335cd3d5b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":8,"Time":4,"analyticsDate":"2015-05-15","_id":"55b8eadd4d6f6335cd3e5b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":1,"Time":5,"analyticsDate":"2015-06-22","_id":"55b8eadd4d6f6335cd3f5b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":5,"Time":3,"analyticsDate":"2015-07-01","_id":"55b8eadd4d6f6335cd405b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":4,"Time":10,"analyticsDate":"2015-06-17","_id":"55b8eadd4d6f6335cd415b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":3,"Time":5,"analyticsDate":"2015-07-24","_id":"55b8eadd4d6f6335cd425b00","_uID":"qfCEWyRg4pHcKh7jj"},
	{"CardioName":"Swimming","Distance":2,"Time":2,"analyticsDate":"2015-06-15","_id":"55b8eadd4d6f6335cd435b00","_uID":"qfCEWyRg4pHcKh7jj"}];
	
	function insertIntoCollection(toInsert) {
		toInsert.forEach(function(obj) {
			Cardio.insert(obj);
		});
	}

	insertIntoCollection(swimming);
}
}
