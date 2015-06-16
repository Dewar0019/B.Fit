if(Meteor.isServer){

	Meteor.startup(function(){
		if (ArmExercises.find().fetch()==0){
			ArmExercises.insert({
				Name: "Bicep Curl",
				Sets: 4,
				Reps: 15, 
				Weight: 20
			});

			ArmExercises.insert({
				Name: "Hammer Curl",
				Sets: 2,
				Reps: 12,
				Weight: 15
			});

		if(Profiles.find().count()== 0 ) {
			Profiles.insert({firstName: "Dewar", lastName:"Tan"})
		}

			ArmExercises.insert({
				Name: "Reverse Curl",
				Sets: 3,
				Reps: 10,
				Weight: 25
			});
		}


		if (ChestExercises.find().fetch()==0){
			ChestExercises.insert({
				Name: "Chest Press",
				Sets: 4,
				Reps: 15, 
				Weight: 20
			});

			ChestExercises.insert({
				Name: "Dips",
				Sets: 2,
				Reps: 12,
				Weight: 15
			});

			ChestExercises.insert({
				Name: "Cable Fly",
				Sets: 3,
				Reps: 10,
				Weight: 25
			});
		}

		if (LegExercises.find().fetch()==0){
			LegExercises.insert({
				Name: "Squats",
				Sets: 4,
				Reps: 15, 
				Weight: "body weight"
			});

			LegExercises.insert({
				Name: "Step Ups",
				Sets: 2,
				Reps: 12,
				Weight: 15
			});

			LegExercises.insert({
				Name: "Calf Raises",
				Sets: 3,
				Reps: 10,
				Weight: 25
			});
		}

		if (CoreExercises.find().fetch()==0){
			CoreExercises.insert({
				Name: "Plank",
				Sets: 4,
				Reps: 15, 
				Weight: "body weight"
			});

			CoreExercises.insert({
				Name: "Side-Plank",
				Sets: 3,
				Reps: 20, 
				Weight: "body weight"
			});

			CoreExercises.insert({
				Name: "Cable crunch",
				Sets: 3,
				Reps: 20, 
				Weight: 50
			});
		}

		if(EllipticalWorkout.find().fetch()==0){
			EllipticalWorkout.insert({
                time: new Date(), 
                ellipticalTime: 10, 
                ellipticalSpeed: 5,
                ellipticalDistance: 3
            });
		}

	});
}