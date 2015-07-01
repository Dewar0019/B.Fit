if(Meteor.isServer){

	Meteor.startup(function(){
		if (Exercises.find().fetch()==0){
			Exercises.insert({
				Category:"arms",
				Name: "Bicep Curl",
				Sets: 4,
				Reps: 15, 
				Weight: 20
			});

			Exercises.insert({
				Category:"arms",
				Name: "Hammer Curl",
				Sets: 2,
				Reps: 12,
				Weight: 15
			});


			Exercises.insert({
				Category:"arms",
				Name: "Reverse Curl",
				Sets: 3,
				Reps: 10,
				Weight: 25
			});


			Exercises.insert({
				Category:"chest",
				Name: "Chest Press",
				Sets: 4,
				Reps: 15, 
				Weight: 20
			});

			Exercises.insert({
				Category:"chest",
				Name: "Dips",
				Sets: 2,
				Reps: 12,
				Weight: 15
			});

			Exercises.insert({
				Category:"chest",
				Name: "Cable Fly",
				Sets: 3,
				Reps: 10,
				Weight: 25
			});

			Exercises.insert({
				Category:"legs",
				Name: "Squats",
				Sets: 4,
				Reps: 15, 
				Weight: 160
			});

			Exercises.insert({
				Category:"legs",
				Name: "Step Ups",
				Sets: 2,
				Reps: 12,
				Weight: 15
			});

			Exercises.insert({
				Category:"legs",
				Name: "Calf Raises",
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
				createdAt: new Date()
			})
		}

		

		

		// if(WalkingCardio.find().fetch()==0){
		// 	WalkingCardio.insert({
  //               Time: new Date(), 
  //               workoutTime: 10, 
  //               Distance: 3
  //           });
		// }
		

	});
}