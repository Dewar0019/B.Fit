if(Meteor.isServer){

	Meteor.startup(function(){
		if (ArmExercises.find().fetch()==0){
			ArmExercises.insert({
				armName: "Bicep Curl",
				armSets: 4,
				armReps: 15, 
				armWeight: 20
			});

			ArmExercises.insert({
				armName: "Hammer Curl",
				armSets: 2,
				armReps: 12,
				armWeight: 15
			});

		if(Profiles.find().count()== 0 ) {
			Profiles.insert({firstName: "Dewar", lastName:"Tan"})
		}

			ArmExercises.insert({
				armName: "Reverse Curl",
				armSets: 3,
				armReps: 10,
				armWeight: 25
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
				legName: "Calf Raises",
				legSets: 3,
				legReps: 10,
				legWeight: 25
			});
		}

		if (CoreExercises.find().fetch()==0){
			CoreExercises.insert({
				coreName: "Plank",
				coreSets: 4,
				coreReps: 15, 
				coreWeight: "body weight"
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