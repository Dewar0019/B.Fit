Routines = new Mongo.Collection('routines');
Exercises = new Mongo.Collection('exercises');
Exercises.initEasySearch('exercisename');

Intermediate = new Mongo.Collection('intermediate');
Completed = new Mongo.Collection('completed'); //This will be for completed exercises
CompletedCardio = new Mongo.Collection('completedCardio');