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


			Exercises.insert({
				Name: "Running",
				Type: ["Cardio"],
			})
		}
		});		
	

function splitString(steps, seperator) {
	var arrayOfStrings = steps.split(seperator);
	return arrayOfStrings;
}


		if(Routines.find().count()== 0) {
			Routines.insert({
				_uID: "dewar" ,
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
				createdAt: new Date()
			})
		}
}