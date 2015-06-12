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
	});
}