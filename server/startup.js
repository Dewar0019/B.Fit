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


			ArmExercises.insert({
				Name: "Reverse Curl",
				Sets: 3,
				Reps: 10,
				Weight: 25
			});
		}

			if(Routines.find().count()== 0 ) {
			Routines.insert({
				_uID: "oeindeow" ,
			 routineName: "Ice Cream Fitness",
			 exercises: [],
			 createdAt: new Date(),
			})
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
				Weight: 160
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
				Weight: 150
			});

			CoreExercises.insert({
				Name: "Side-Plank",
				Sets: 3,
				Reps: 20, 
				Weight: 150
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
                Time: new Date(), 
                workoutTime: 10, 
                Speed: 5,
                Distance: 3
            });
		}
		if(StairMasterWorkout.find().fetch()==0){
			StairMasterWorkout.insert({
                Time: new Date(), 
                workoutTime: 10, 
                Speed: 5,
                Distance: 3
            });
		}

		if(CyclingCardio.find().fetch()==0){
			CyclingCardio.insert({
                Time: new Date(), 
                workoutTime: 10, 
                Speed: 5,
                Distance: 3
            });
		}

		// if(WalkingCardio.find().fetch()==0){
		// 	WalkingCardio.insert({
  //               Time: new Date(), 
  //               workoutTime: 10, 
  //               Distance: 3
  //           });
		// }
		
		if(SwimmingWorkout.find().fetch()==0){
			SwimmingWorkout.insert({
                Time: new Date(), 
                workoutTime: 10, 
                Laps: 20,
                Distance: 500
            });
		}

		if(YogaFlex.find().fetch()==0){
			YogaFlex.insert({
				Name: "Side plank",
				workoutTime: 5
			});

			YogaFlex.insert({
				Name: "Seated head to knee",
				workoutTime: 10
			});
		}

		if(PilatesFlex.find().fetch()==0){
			PilatesFlex.insert({
				Name: "Saw",
				workoutTime: 5
			});

			PilatesFlex.insert({
				Name: "Bicycle",
				workoutTime: 10
			});
		}

	});
}