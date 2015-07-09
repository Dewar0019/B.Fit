if(Meteor.isServer){

	Meteor.startup(function(){
		if (Exercises.find().fetch()==0){

			Exercises.insert({
				Tags:["arms"],
				Name: "Bicep Curl",
			});

			Exercises.insert({
				Tags:["arms"],
				Name: "Hammer Curl",
			});


			Exercises.insert({
				Tags:["arms"],
				Name: "Reverse Curl",
			});

			Exercises.insert({
				Tags:["arms"],
				Name: "Triceps Extensions",
			});

			Exercises.insert({
				Tags:["arms"],
				Name: "Dips",
			});

			Exercises.insert({
				Tags:["arms"],
				Name: "Pushups",
			});

			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			Exercises.insert({
				Tags:["chest"],
				Name: "Chest Press",
			});

			Exercises.insert({
				Tags:["chest"],
				Name: "Dips",
			});


			Exercises.insert({
				Tags:["chest"],
				Name: "Cable Fly",
			});

			Exercises.insert({
				Tags:["chest"],
				Name: "Butterfly",
			});

			Exercises.insert({
				Tags:["chest"],
				Name: "Cable Fly",
			});

			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			Exercises.insert({
				Tags:["legs"],
				Name: "Squats",
			});

			Exercises.insert({
				Tags:["legs"],
				Name: "Step Ups",
			});

			Exercises.insert({
				Tags:["legs"],
				Name: "Calf Raises",
			});

			Exercises.insert({
				Tags:["legs"],
				Name: "Stepups",
			});

			Exercises.insert({
				Tags:["legs"],
				Name: "Leg Press",
			});

			Exercises.insert({
				Tags:["legs"],
				Name: "Calf Raises",
			});

			Exercises.insert({
				Tags:["legs"],
				Name: "Lunges",
			});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			Exercises.insert({
				Tags:["back"],
				Name: "Lunges",
			});

			Exercises.insert({
				Tags:["back"],
				Name: "Incline Row",
			});

			Exercises.insert({
				Tags:["back"],
				Name: "Inverted Row",
			});

			Exercises.insert({
				Tags:["back"],
				Name: "Incline Row",
			});

			Exercises.insert({
				Tags:["back"],
				Name: "Back Extention",
			});

			Exercises.insert({
				Tags:["back"],
				Name: "Cable Row",
			});

			Exercises.insert({
				Tags:["back"],
				Name: "Supermans",
			});
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
	});
}