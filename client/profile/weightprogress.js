Template.weightProgress.rendered = function () {
  initializeWeightData();
  var chart = c3.generate({
    bindto: this.find('#weightChart'),
      data: {
        xs: {
          'Weight': 'Time',
        },
        columns: [['Time'],['Weight'],]
      },
      axis: {
              x: { label: { text: 'Date', position: 'outer-middle'}, type: 'timeseries', tick: { format: '%m-%d'} },
              y: { label: { text: "Weight", position: 'outer-middle'} },
            },
  });

  this.autorun(function (tracker) {
    chart.load({columns: [
      timeData,
      weightData,
      []
    ]});
  });
}


var timeData = ['Time'];
var weightData = ['Weight'];

function initializeWeightData(){ //Finds all Weight data at the moment and stores into C3.js formats
  var allWeight = UserWeight.find().fetch(); //Should eventually include only the users data and exclude startup
  allWeight.forEach(function(weightTime) {
         timeData.push(weightTime.dateAdded);
         weightData.push(weightTime.weight);
        });
      }
 