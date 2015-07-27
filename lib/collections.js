Routines = new Mongo.Collection('routines'); // collection for storing routines
Exercises = new Mongo.Collection('exercises'); // Collection for exercises users can choose from
Exercises.initEasySearch('Name');

Intermediate = new Mongo.Collection('intermediate');
Completed = new Mongo.Collection('completed'); //This will be for completed routines
Cardio = new Mongo.Collection('completedCardio'); // This will be for individual Cardio exercises
Strength = new Mongo.Collection('completedStrength'); // This will be for individual Strength exercises

ExercisesCardio = new Mongo.Collection('exercisesCardio');
ProfileImages = new Mongo.Collection('profileimages');

UserWeight = new Mongo.Collection('userweight');
