Routines = new Mongo.Collection('routines');
Exercises = new Mongo.Collection('exercises');
Exercises.initEasySearch('Name');

Intermediate = new Mongo.Collection('intermediate');
Completed = new Mongo.Collection('completed'); //This will be for completed exercises
Cardio = new Mongo.Collection('completedCardio');
ExercisesCardio = new Mongo.Collection('exercisesCardio');
ProfileImages = new Mongo.Collection('profileimages');

UserWeight = new Mongo.Collection('userweight');