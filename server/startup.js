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
				chestName: "Chest Press",
				chestSets: 4,
				chestReps: 15, 
				chestWeight: 20
			});

			ChestExercises.insert({
				chestName: "Dips",
				chestSets: 2,
				chestReps: 12,
				chestWeight: 15
			});

			ChestExercises.insert({
				chestName: "Cable Fly",
				chestSets: 3,
				chestReps: 10,
				chestWeight: 25
			});
		}

		if (LegExercises.find().fetch()==0){
			LegExercises.insert({
				legName: "Squats",
				legSets: 4,
				legReps: 15, 
				legWeight: "body weight"
			});

			LegExercises.insert({
				legName: "Step Ups",
				legSets: 2,
				legReps: 12,
				legWeight: 15
			});

			LegExercises.insert({
				Name: "Calf Raises",
				Sets: 3,
				legReps: 10,
				legWeight: 25
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